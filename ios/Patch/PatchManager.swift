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
import SSZipArchive

@objc open class PatchManager: NSObject {
  @objc public class func checkPatchAvailable() {
    let observable = HttpUtil.fetchPatchVersion(versionApi: "\(Configuration.ServerRoot)\(Configuration.PatchVersionAPI)")
    observable.subscribeOn(ConcurrentDispatchQueueScheduler.init(qos: .utility))
      .filter{versionInfo in
        PatchManager.isCurrentVersionSupported(supportedVersions: versionInfo?.supportedVersions)
      }
      .flatMap{_ in
//        return HttpUtil.downloadPatch(downloadUrl: "\(Configuration.ServerRoot)\(Configuration.PatchDownloadAPI)")
      
        return HttpUtil.urlDownloadPatch(downloadUrl: "\(Configuration.ServerRoot)\(Configuration.PatchDownloadAPI)")
      }.map{ filePath in
//        print("===>Prepare to remove zip file \(filePath)")
        return PatchManager.preparePatch(patchPath: filePath)
      }.subscribe(onNext: {val in
        print("===>Patch on next, value: \(val)")
      }, onError: {error in
        print("===>Patch error \(error)")
        let fileLocation = Configuration.shared.downloadDestination
        if FileManager.default.fileExists(atPath: fileLocation.path) {
          try? FileManager.default.removeItem(at: Configuration.shared.downloadDestination)
        }
      },onDisposed: nil)
  }
  
  /// Check if current patch version is OK to be updated
  private class func isCurrentVersionSupported(supportedVersions: [String]?) -> Bool {
    let currentVersion = UserDefaults.standard.string(forKey: Configuration.PatchVersion)
    // Where no update happened, do update
    if currentVersion == nil {
      return true;
    }
    
    if let supportVersions = supportedVersions, let current = currentVersion {
      return supportVersions.contains(current)
    }
    
    return false
  }
  
  /// Prepare patch
  private class func preparePatch(patchPath filePath: String?) -> Bool {
    guard let patchLocation = filePath else {
      return false
    }
    
    do{
      let upzipResult = try PatchManager.unzip(destinationLocation: patchLocation)
      try PatchManager.deleteUnzipped(patchLocation)
      return upzipResult
    } catch let error {
      print("==>Error in unzip and delete \(error)");
      return false
    }
  }
  
  /// Unzip the patch zip
  ///
  /// throws: if no file in given path
  class func unzip(destinationLocation filePath: String) throws -> Bool {
    if !FileManager.default.fileExists(atPath: filePath) {
      throw PatchError.fileNotExists
    }
    
    let unzipResult = SSZipArchive.unzipFile(atPath: filePath,
                                             toDestination: Configuration.shared.destinationDirectory.path);
    
    return unzipResult
  }
  
  /// Delete zip
  class func deleteUnzipped(_ filePath: String) throws {
    try FileManager.default.removeItem(atPath: filePath)
  }
  
  private class func updatePatchVersion(version: String) {
    UserDefaults.standard.set(version, forKey: Configuration.PatchVersion);
    UserDefaults.standard.synchronize()
  }
}
