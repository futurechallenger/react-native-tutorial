//
//  PatchManager.swift
//  AwesomeProject
//
//  Created by Uncle Charlie on 2/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import Alamofire
import RxSwift

@objc open class PatchManager: NSObject {
  public class func checkPatchAvailable() -> Bool {
    var patchResult = false
    
    let observable = HttpUtil.fetchPatchVersion(versionApi: "\(Configuration.ServerRoot)\(Configuration.PatchVersionAPI)")
    observable.filter{versionInfo in PatchManager.isCurrentVersionSupported(supportedVersions: versionInfo?.supportedVersions)}
      .flatMap{_ in
        return HttpUtil.downloadPatch(downloadUrl: "\(Configuration.ServerRoot)\(Configuration.PatchDownloadAPI)")
      }.map{ filePath in
        do{
          try PatchManager.unzip()
          try PatchManager.deleteUnzipped()
//          return true
        }catch {
//          return false
        }
      }.subscribe(onNext: {_ in
        patchResult = true
      }, onError: {error in
        print("==>Patch error \(error)")
      }, onCompleted: {
        patchResult = true
        print("==>Patch completed")
      }, onDisposed: nil)
    
    return patchResult;
  }
  
  /// Check if current patch version is OK to be updated
  private class func isCurrentVersionSupported(supportedVersions: [String]?) -> Bool {
    let currentVersion = UserDefaults.standard.string(forKey: Configuration.PatchVersion)
    
    if let supportVersions = supportedVersions, let current = currentVersion {
      return supportVersions.contains(current)
    }
    
    return false
  }
  
  /// Unzip the patch zip
  ///
  /// throws: if no file in given path
  class func unzip() throws -> Bool {
    if !FileManager.default.fileExists(atPath: Configuration.downloadDestination.absoluteString) {
      throw PatchError.fileNotExists
    }
    
    let unzipResult = SSZipArchive.unzipFile(atPath: Configuration.downloadDestination.absoluteString,
                                             toDestination: Configuration.patchDestination.absoluteString);
    
    return unzipResult
  }
  
  /// Delete zip
  class func deleteUnzipped() throws {
    try FileManager.default.removeItem(atPath: Configuration.downloadDestination.absoluteString)
  }
}
