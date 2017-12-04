//
//  PatchError.swift
//  AwesomeProject
//
//  Created by Uncle Charlie on 2/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

enum PatchError: Error {
  case whoKnowsError
  case fileNotExists
  case unzipPatchError
  case deletePatchError
  case dataError
  case createDownloadError
}
