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
          
          if let data = response.data {
            let decoder = JSONDecoder()
            var versionInfo = try? decoder.decode(VersionInfo.self, from: data)
            // If data is not right, it's not necessary to check those values later
            if let _ = versionInfo?.status, let _ = versionInfo?.supportedVersions {
              versionInfo = nil;
            }
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
        return (Configuration.downloadDestination, [.createIntermediateDirectories])
      }
      
      let request = Alamofire.download(url, to: destination).response{response in
        print(response)
        if let error = response.error {
          observer.onError(error)
          return
        }
        
        if let filePath = response.destinationURL?.path {
          print("==>file path is \(filePath)")
          observer.onNext(filePath)
        } else {
          observer.onNext("")
        }
        
        observer.onCompleted()
      }
      
      return Disposables.create {
        return request.cancel()
      }
    }
  }
}
