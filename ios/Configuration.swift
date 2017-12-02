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
  
  public static let ServerRoot = "http://127.0.0.1:8090";
  public static let PatchVersionAPI = "/api/patch/version"
  public static let PatchDownloadAPI = "/api/patch/download"
  
  /// Destination directory
  private static let destinationDirectory = FileManager.default.urls(for: .documentDirectory, in:.userDomainMask)[0]
  
  /// Downloaded zip file path
  public static var downloadDestination: URL {
    get {
      return Configuration.destinationDirectory.appendingPathComponent("patch.bundle.zip")
    }
  }
  
  /// Unzipped bundle path
  public static var patchDestination: URL {
    get {
      return Configuration.destinationDirectory.appendingPathComponent("patch.bundle")
    }
  }
}
