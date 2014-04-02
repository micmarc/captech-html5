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
            _.each(this.model.models, function (category) {
                $(this.el).append(new CategoryListItemView({model:category}).render().el);
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
    
    // Main view
    var AppView = Backbone.View.extend({
        el: $("#html5challenge"),
        initialize: function() {
            // this.footer = this.$('footer');
            // this.main = this.$('main');
            // this.header = this.$('header');
            this.categoryList = new CategoryCollection();
            this.categoryListView = new CategoryListView({model:this.categoryList});
            this.categoryList.fetch();
            this.render();
        },
        render: function() {
            $('#categories-nav').html(this.categoryListView.render().el);
        }
    });
    
    // Start it up
    var App = new AppView;
});