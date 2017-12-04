//
//  Configuration.swift
//  AwesomeProject
//
//  Created by Uncle Charlie on 2/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

@objc open class Configuration: NSObject {
  public static let PatchVersion = "PATCH_VERSION_KEY";
  
  public static let ServerRoot = "http://127.0.0.1:3033";
  public static let PatchVersionAPI = "/api/patch/version"
  public static let PatchDownloadAPI = "/patch/download"
  
  /// Singleton instance
  open static var `shared` = Configuration()
  
  private override init(){}
  
  /// Destination directory
  public let destinationDirectory = FileManager.default.urls(for: .documentDirectory, in:.userDomainMask)[0]
  
  /// Downloaded zip file path
  public var downloadDestination: URL {
    get {
      return self.destinationDirectory.appendingPathComponent("patch.bundle.zip")
    }
  }
  
  /// Unzipped bundle path
  public var patchDestination: URL {
    get {
      return self.destinationDirectory.appendingPathComponent("out-bundle")
    }
  }
}
