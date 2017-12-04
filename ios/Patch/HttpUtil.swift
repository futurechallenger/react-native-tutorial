//
//  HttpUtil.swift
//  AwesomeProject
//
//  Created by Uncle Charlie on 2/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import RxSwift
import Alamofire

@objc open class HttpUtil: NSObject {
  /// Fetch patch version info from server
  ///
  /// - url: Url to server
  public class func fetchPatchVersion(versionApi url: String) -> Observable<VersionInfo?> {
    return Observable.create{ observer in
      let request = Alamofire.request(url)
        .response(queue: nil, completionHandler: {response in
          if let error = response.error {
            observer.onError(error)
            return
          }
          
          guard let data = response.data else {
            observer.onError(PatchError.dataError)
            return
          }
          
          let decoder = JSONDecoder()
          let versionInfo = try? decoder.decode(VersionInfo.self, from: data)
          // If data is not right, it's not necessary to check those values later
          if let _ = versionInfo?.status, let _ = versionInfo?.supportedVersions {
            observer.onNext(versionInfo) 
          }
          
          observer.onCompleted()
        })
      
      return Disposables.create {
        request.cancel();
      }
    }
  }
  
  /// Download zip of patch from server
  class func downloadPatch(downloadUrl url: String) -> Observable<String?> {
    return Observable.create{observer in
      let destination: DownloadRequest.DownloadFileDestination = {_, _ in
        return (Configuration.shared.downloadDestination, [.removePreviousFile, .createIntermediateDirectories])
      }
      
      let request = Alamofire.download(url, to: destination)
        .downloadProgress{ progress in
          print("===>download progress \(progress)")
        }
        .response{response in
          if let error = response.error {
            observer.onError(error)
            return
          }
        
        guard let filePath = response.destinationURL?.path else {
          observer.onError(PatchError.fileNotExists)
          return
        }
        
        if !FileManager.default.fileExists(atPath: filePath)  {
          observer.onError(PatchError.fileNotExists)
        } else {
          print("==>Download path \(filePath)")
          observer.onNext(filePath)
        }
        
        observer.onCompleted()
      }
      
      return Disposables.create {
        return request.cancel()
      }
    }
  }
  
  public class func urlDownloadPatch(downloadUrl url: String) -> Observable<String?> {
    return Observable.create{observer in
//      let sessionConfiguration = URLSessionConfiguration.background(withIdentifier: "com.hotpatch.rn")
      let sessionConfiguration = URLSessionConfiguration.default
      let downloadDelegate = DownloadDelegateImpl(onComplete: {filePath in
        observer.onNext(filePath)
      }, onError: {error in
        observer.onError(error ?? PatchError.whoKnowsError)
      })
      let urlSession = URLSession(configuration: sessionConfiguration, delegate: downloadDelegate, delegateQueue:nil)
      var downloadTask: URLSessionDownloadTask? = nil
      
      if let patchUrl = URL(string: url) {
        downloadTask = urlSession.downloadTask(with: patchUrl)

        downloadTask?.resume()
      }else {
        observer.onError(PatchError.createDownloadError)
      }
      
      return Disposables.create {
        if let task = downloadTask {
          task.cancel()
        }
      }
    }
  }
  
  // MARK: type alias
  
  typealias OnComplete = (String) -> Void
  typealias OnError = (Error?) -> Void
  
  @objc class DownloadDelegateImpl: NSObject, URLSessionDelegate, URLSessionDownloadDelegate {
    let onComplete: OnComplete?
    let onError: OnError?
    
    init(onComplete: @escaping  OnComplete, onError: @escaping OnError) {
      self.onComplete = onComplete
      self.onError = onError
    }
    
    /// Check if there's an error in downloading
    func urlSession(_ session: URLSession, didBecomeInvalidWithError error: Error?) {
      print("download error")
      if let _ = self.onError {
        self.onError?(error)
      }
    }
    
    /// Download something here when it done save it.
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL) {
      do {
        if FileManager.default.fileExists(atPath: Configuration.shared.downloadDestination.path) {
          try FileManager.default.removeItem(at: Configuration.shared.downloadDestination)
        } else {
          try FileManager.default.copyItem(at: location, to: Configuration.shared.downloadDestination)
        }
        
        if let _ = self.onComplete {
          self.onComplete?(Configuration.shared.downloadDestination.path)
        }
      } catch let error {
        print("===>File remove error \(error)")
        if let _ = self.onError {
          self.onError?(error)
        }
      }
    }
    
    /// Download progress
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didWriteData bytesWritten: Int64, totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64) {
      print("===>download progress \(bytesWritten / totalBytesWritten)")
    }
  }
}
