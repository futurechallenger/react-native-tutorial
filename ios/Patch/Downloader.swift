//
//  Downloader.swift
//  AwesomeProject
//
//  Created by Uncle Charlie on 1/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import UIKit
import Alamofire

@objc open class Downloader:NSObject {
  enum DownloadError: Error {
    case fileNotExists
    case unzipError
    case downloadError
  }

  static let sharedInstance = Downloader();
  
  private override init(){}
  
  /// Destination directory
  private let destinationDirectory = FileManager.default.urls(for: .documentDirectory, in:.userDomainMask)[0]
  
  /// Downloaded zip file path
  public var downloadDestination: URL {
    get {
      return self.destinationDirectory.appendingPathComponent("patch.bundle.zip")
    }
  }
  
  /// Unzipped bundle path
  public var patchDestination: URL {
    get {
      return self.destinationDirectory.appendingPathComponent("patch.bundle")
    }
  }
  
  /// Download zip of patch from server
  func download(withUrl url: String) {
    let destination: DownloadRequest.DownloadFileDestination = {_, _ in
      return (self.downloadDestination, [.createIntermediateDirectories])
    }
    
    Alamofire.download(url, to: destination).response{response in
      print(response)
      
      if response.error != nil, let filePath = response.destinationURL?.path {
        print("==>file path is \(filePath)")
      }
    }
  }
  
  /// Unzip the patch zip
  func unzip() throws {
    if !FileManager.default.fileExists(atPath: self.downloadDestination.path) {
      throw DownloadError.fileNotExists
    }
    
    let unzipResult = SSZipArchive.unzipFile(atPath: self.downloadDestination.path,
                                             toDestination: self.patchDestination.path);
    if !unzipResult {
      throw DownloadError.unzipError
    }
  }
  
  /// Delete zip
  func delete(filePath path: String) throws {
    try FileManager.default.removeItem(atPath: self.downloadDestination.path)
  }
}

