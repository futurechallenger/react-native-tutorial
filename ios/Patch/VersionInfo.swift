//
//  VersionInfo.swift
//  AwesomeProject
//
//  Created by Uncle Charlie on 2/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

@objc open class VersionInfo: NSObject, Codable {
  /// server version which is used to update local bundle
  public var currentVersion: String = ""
  
  /// If local bundle version is one of these, it's ok to update
  public var supportedVersions: [String] = []
  
  /// If it's all rigth getting data
  public var status: Bool = false
  
  /// How json keys mapping to class properties
  enum CodingKeys: String, CodingKey {
    case currentVersion = "current_version"
    case supportedVersions = "supported_versions"
    case status = "status"
  }
}
