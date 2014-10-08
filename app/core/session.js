/*
 * Created by ROMEO on 24.02.14.
 * A basic session model holding user credentials. 
 */

define([

    'jquery',
    'underscore',
    'backbone',

    // Auth module
    'core/auth',

    'cookie'

], function($, _, Backbone) {
    'use strict';

    var Session = Backbone.Model.extend({

        // Creating a new session instance will attempt to load the user cookie.
        initialize: function() {
            this.load();
        },

        // Returns true if the user is authenticated.
        isAuthenticated: function() {
            return Boolean(this.get('accessToken'));
        },

        // Saving will create the cookie data instead of syncing the model.
        save: function(model) {
            $.cookie('accessToken', model.get('token'));
            $.cookie('email', model.get('email'));
            $.cookie('userId', model.get('id'));
            $.cookie('userName', model.get('name'));
            $.cookie('userPhoto', model.get('photo'));
        },

        // Loads the user's credentials from the cookie data.
        load: function() {
            this.set('accessToken', $.cookie('accessToken'));
            this.set('email', $.cookie('email'));
            this.set('userId', $.cookie('userId'));
            this.set('userName', $.cookie('userName'));
            this.set('userPhoto', $.cookie('userPhoto'));

            //set the Authorization header
            Backbone.BasicAuth.set($.cookie('accessToken'));
        },

        destroy: function() {
            this.unset('accessToken');
            return $.removeCookie('accessToken');
        }

    });

    return new Session();

});