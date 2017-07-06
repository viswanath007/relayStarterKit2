/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */


// Model types
class User {}
class Widget {}

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

// let data = db.collection('persons').find({}).toArray()
let data = require('./MOCK_DATA.json');
// let data =  {};
var widgets = data.map((obj, i) => {
  var widget = new Widget();
  widget.id = obj.id;
  widget.first_name = obj.first_name;
  widget.last_name = obj.last_name;
  widget.email = obj.email;
  widget.gender = obj.gender;
  widget.ip_address = obj.ip_address;
  // widget.id = `${i}`;
  return widget;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getWidget: (id) => widgets.find(w => w.id === id),
  getWidgets: (db) => widgets,
  User,
  Widget,
};
