$(function(){
    console.log("Ready!");
    
    // Categories
    var Category = Backbone.Model.extend();
    var CategoryCollection = Backbone.Collection.extend({
        model: Category,
        url: "http://html5news.herokuapp.com/articles/categories"
    });
    var CategoryListView = Backbone.View.extend({
        tagName: "ul",
        initialize: function() {
            this.model.bind("reset", this.render, this);
        },
        render: function() {
            _.each(this.model.models, function (model) {
                $(this.el).append(new CategoryListItemView({model:model}).render().el);
            }, this);
            return this;
        }
    });
    var CategoryListItemView = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#category-template').html()),
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    // Banners
    var Banner = Backbone.Model.extend();
    var BannerCollection = Backbone.Collection.extend({
        model: Banner,
        url: "http://html5news.herokuapp.com/banners"
    });
    var BannerView = Backbone.View.extend({
        tagName: "div",
        initialize: function() {
            this.model.bind("reset", this.render, this);
        },
        render: function() {
            _.each(this.model.models, function (model) {
                $(this.el).append(new BannerItemView({model:model}).render().el);
            }, this);
            return this;
        }
    });
    var BannerItemView = Backbone.View.extend({
        tagName: "p",
        template: _.template($('#banner-template').html()),
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function (eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    // Main view
    var AppView = Backbone.View.extend({
        el: $("#html5challenge"),
        initialize: function() {
            var self = this;
            
            // this.footer = this.$('footer');
            // this.main = this.$('main');
            // this.header = this.$('header');
            this.categoryList = new CategoryCollection();
            this.categoryList.fetch({
                success: function(model) {
                    //self.render();
                    var categoryListView = new CategoryListView({model:model});
                    $('#categories-nav').html(categoryListView.render().el);
                }
            });

            this.banners = new BannerCollection();
            this.banners.fetch({
                success: function(model) {
                    var bannerView = new BannerView({model:model});
                    $('#banner-content').html(bannerView.render().el);
                }
            });
        }
    });
    
    // Start it up
    var App = new AppView;
});