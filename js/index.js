/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});





var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // Blog Retreive / Posts Retreive
    blog: function(){
        function getBlogs() {
            var dfd = $.Deferred();
            $.ajax({
                url: 'http://timetodial.com/api/get_recent_posts/',
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    var source   = $("#blog-template").html();
                    var template = Handlebars.compile(source);
                    var blogData = template(data);
                    $('#blog-data').html(blogData);
                    $('#blog-data').trigger('create');
                    dfd.resolve(data);

                },
                error: function(data){
                    console.log(data);
                }
            });
            return dfd.promise();
        };

        getBlogs().then(function(data){
            $('#all-posts').on('click','li', function(e){
                localStorage.setItem('postData', JSON.stringify(data.posts[$(this).index()]));
            });
        });


    },

    // Single Post Retreive
    single: function() {

            var postDataStorage = localStorage.getItem('postData');
            var source   = $("#single-template").html();
            var template = Handlebars.compile(source);
            var postData = template(JSON.parse(postDataStorage));
            $('#single-data').html(postData);

    },


    // Login Page Retreive

    login: function(){
        $.ajax({
            url: 'http://timetodial.com/api/get_page/?page_id=672',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var source   = $("#login").html();
                var template = Handlebars.compile(source);
                var portfolioData = template(data);
                $('#login').html(portfolioData);
                $('#login').trigger('create');

            },
            error: function(data){
                console.log(data);
            }
        });
    },

    // About Us Page

    AboutUs: function(){
        $.ajax({
            url: 'http://timetodial.com/api/get_page/?page_id=449',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var source   = $("#about").html();
                var template = Handlebars.compile(source);
                var portfolioData = template(data);
                $('#about').html(portfolioData);
                $('#about').trigger('create');

            },
            error: function(data){
                console.log(data);
            }
        });
    },

    // Categories Begin
    // Acting Academies

    Acting: function(){
        $.ajax({
            url: 'http://timetodial.com/api/get_page/?page_id=611',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var source   = $("#acting").html();
                var template = Handlebars.compile(source);
                var portfolioData = template(data);
                $('#acting').html(portfolioData);
                $('#acting').trigger('create');

            },
            error: function(data){
                console.log(data);
            }
        });
    },

    // acting categories

    Actingcategories: function(){
        $.ajax({
            url: 'http://timetodial.com/api/get_page/?page_id=787',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var source   = $("#actingcat").html();
                var template = Handlebars.compile(source);
                var portfolioData = template(data);
                $('#actingcat').html(portfolioData);
                $('#actingcat').trigger('create');

            },
            error: function(data){
                console.log(data);
            }
        });
    },


};
