  Meteor.subscribe('comments');
  Meteor.subscribe('contents');
  //for subscribing the user data
Tracker.autorun(function () {
    Meteor.subscribe("allUserData");
});
//for subscribing the user data
//for hometemp
  Template.homeItem.helpers({
    'selectedClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return "Big"
      }else{
        return "contentMain"
      }
    },
    'BigClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return false
      }else{
        return true
      }
    },
    'editing':function(){
      return Session.equals('editContentId',this._id);
    },
    'notAnonymous':function(){
      var anonymousCheck= this.author;
      if (anonymousCheck=="Anonymous") {
        return false
      }else{
        return true
      }
    }//,
});

    Template.homeItem.events({
      'click .expandOrCollapse':function(event){
        event.preventDefault();
        $(event.target).parent().prev().toggleClass("contentMain Big");
      }
  });
  //for hometemp
//Template.tagsItem.helpers({
    //'selectedClass':function(){
      //var contentCharacters= this.a;
      //var contentLinebreaks= this.contentLines;
      //var contentParagraphs= this.contentPs-2;
      //var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      //if (totalCountOfCLPs<60) {
        //return "Big"
      //}else{
        //return "contentMain"
      //}
    //},
    //'BigClass':function(){
      //var contentCharacters= this.a;
      //var contentLinebreaks= this.contentLines;
      //var contentParagraphs= this.contentPs-2;
      //var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      //if (totalCountOfCLPs<60) {
        //return false
      //}else{
        //return true
      //}
    //},
    //'tagsItemIdentification': function(){
    //var locationArray= location.href.split('/');
    //var tagId= locationArray[4];
    //return tagId
    //},
    //Contents:function(){
    //var locationArray= location.href.split('/');
    //var tagId= locationArray[4];
    //return contentsList.find({tags: { $in:[tagId]}}, {sort: {karmicPoints: -1}});
    //}
//});

//Template.tagsItem.events({
      //'click .expandOrCollapse':function(event){
        //event.preventDefault();
        //$(event.target).parent().prev().toggleClass("contentMain Big");
      //}
//});

Template.contentEdit.events({
//for editing
    'click .cancelContent':function(){
      Session.set('editContentId',null);
    },
    'click .saveContent':function(){
      var editContentId=Session.get('editContentId');
      var editContent={
      title: $(".titleEditSpace").val(),
      content: $(".contentEditSpace").val()
      //tags: $(".tagEditSpace").val()
      };
      Meteor.call('editContentData',editContent,editContentId);
      Session.set('editContentId',null);
    }
//for editing
});

  Template.contentEdit.onRendered(function(){
    $('.contentEditSpace').ckeditor(function(){
      $('.cke').css({'border':'2px solid silver', 'position':'relative','left':'-40px'});
    });
  });

Template.contentEssentials.helpers({
    'commentsCount':function(){
      return commentsList.find({contentId: this._id}).count()
    },
  //'shareData': function() {
    //console.log(this.title);
    //console.log(Meteor.users.findOne(this.createdBy));
    //console.log('/content/' + this._id);
    //return {
      //title: this.title,
      //author: Meteor.users.findOne(this.createdBy),
      //url: '/content/' + this._id
    //}
  //},
    'ownContent':function(){
      var currentUserId = Meteor.userId();
      if(this.createdBy == currentUserId || this.createdBy== "pJTpffDZGjFEPaTSR"){
        return true
      };
    }
});

Template.contentEssentials.events({
    'click .applaudContent':function(){      
      var currentUserId=Meteor.userId();
      var content=contentsList.findOne(this._id);
      var contentCreatedBy=content.createdBy;
      if(_.include(content.applauders,currentUserId)){
        alert("Already applauded")
    }else{
    Meteor.call('modifyContentApplaud',this._id,currentUserId,contentCreatedBy);
  }
  },  

    'click .removeContent':function(){
      if (confirm("Are you sure you want to delete it?")) {
    Meteor.call('removeContentData',this._id);};
  },

    'click .favouriteContent':function(){      
      var currentUserId=Meteor.userId();
      var content=contentsList.findOne(this._id);
      var contentCreatedBy=content.createdBy;
      if(_.include(content.favouriters,currentUserId)){
        alert("Already made it favourite")
    }else{
      Meteor.call('modifyContentFavourite', this._id, currentUserId,contentCreatedBy);
    }
    },
    'click .editContent':function(){
      Session.set('editContentId',this._id);
    }
});

  Template.poemsItem.helpers({
    'selectedClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return "Big"
      }else{
        return "contentMain"
      }
    },
    'BigClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return false
      }else{
        return true
      }
    },
    'editing':function(){
      return Session.equals('editContentId',this._id);
    },
    'notAnonymous':function(){
      var anonymousCheck= this.author;
      if (anonymousCheck=="Anonymous") {
        return false
      }else{
        return true
      }
    }
  });

    Template.poemsItem.events({
      'click .expandOrCollapse':function(event){
        event.preventDefault();
        $(event.target).parent().prev().toggleClass("contentMain Big");
      }
  });
    
  Template.addPoems.onRendered(function(){
    CKEDITOR.replace('basketSpace');
  });

  Template.addToems.onRendered(function(){
    CKEDITOR.replace('basketSpace');
  });

  Template.addPoems.events({
    'submit form': function(event){
      event.preventDefault();
      var themeNameVar= event.target.theme.value;
      var poemNameVar= event.target.poem.value;
      var poemNameVarLength= poemNameVar.length;
      var contentLines= poemNameVar.split("br /").length;
      var contentPs= poemNameVar.split("/p").length;
      //var tagsNameVar= event.target.tagsForPoems.value;
      //var tagsNameVarSplit= tagsNameVar.split(" ");
      //var tagsLength= tagsNameVarSplit.length;
      var checkboxNameVar= document.getElementById("anonymousPosting").checked;
      if (themeNameVar!=="" && poemNameVar!=="") {
      if (checkboxNameVar!== true) {
      var authorNameVar= Meteor.user().profile.name;
      var authorPhotoNameVar= Meteor.user().profile.picture;
      var anonymousNameVar= false;
    }else{
      var authorNameVar= "Anonymous";
      var anonymousNameVar= true;
    }
      var createdAtNameVar= new Date().toLocaleString();
      var createdByNameVar= Meteor.userId();
      Meteor.call('insertPoemData',themeNameVar,poemNameVar,authorNameVar,createdAtNameVar,createdByNameVar,authorPhotoNameVar,anonymousNameVar,poemNameVarLength,contentLines,contentPs,function(error){
        if (error)
          return alert(error.reason);
      Router.go('homeTemp');
      });
    }else{
      alert("Please do not leave any field empty");
    }
    }
  });

  Template.addToems.events({
    'submit form': function(event){
      event.preventDefault();
      var themeNameVar=event.target.theme.value;
      var toemNameVar=event.target.toem.value;
      var toemNameVarLength= toemNameVar.length;
      var contentLines= toemNameVar.split("br /").length;
      var contentPs= toemNameVar.split("/p").length;
      //var tagsNameVar= event.target.tagsForToems.value;
      //var tagsNameVarSplit= tagsNameVar.split(" ");
      //var tagsLength= tagsNameVarSplit.length;
      var checkboxNameVar= document.getElementById("anonymousPosting").checked;
      if (themeNameVar!=="" && toemNameVar!=="") {
      if (checkboxNameVar!== true) {
      var authorNameVar=Meteor.user().profile.name;
      var authorPhotoNameVar= Meteor.user().profile.picture;
      var anonymousNameVar= false;
      }else{
      var authorNameVar="Anonymous";
      var anonymousNameVar= true;
      }
      var createdAtNameVar= new Date().toLocaleString();
      var createdByNameVar= Meteor.userId();

      Meteor.call('insertToemData',themeNameVar,toemNameVar,authorNameVar,createdAtNameVar,createdByNameVar,authorPhotoNameVar,anonymousNameVar,toemNameVarLength,contentLines,contentPs,function(error){
        if (error)
          return alert(error.reason);
      Router.go('homeTemp');
      });
    }else{
      alert("Please do not leave any field empty");
    }
    }
  });

  Template.commentsTemp.helpers({
    'ownComment':function(){
      var currentUserId = Meteor.userId();
      if(this.createdBy == currentUserId || this.createdBy== "pJTpffDZGjFEPaTSR"){
        return true
      };    
    },
    'commentPic':function(){
      var commentPicture=Meteor.user().profile.picture;
      return commentPicture
    },
    'Comment':function(){
      return commentsList.find({contentId: this._id}).fetch().reverse()
    }
    });

  Template.commentsTemp.events({
    'click .removeComment':function(){
    if (confirm("Delete this comment")){
      Meteor.call('removeCommentData',this._id);};
    }
  });

  Template.commentSubmit.events({
    'submit form':function(event,template){
      event.preventDefault();
      var commentBodyNamevar= event.target.commentBody.value;
      commentBodyNamevar= commentBodyNamevar.replace(/\r?\n/g, '<br />');
      if (commentBodyNamevar!=="") {
      var authorNameVar=Meteor.user().profile.name;
      var createdByNameVar=Meteor.userId();
      var commentAuthorPicNameVar=Meteor.user().profile.picture;
      var addComment={
        body: commentBodyNamevar,
        author: authorNameVar,
        contentId: this._id,
        createdBy: createdByNameVar,
        commentAuthorPic:commentAuthorPicNameVar,
        createdAt: new Date().toLocaleString()
      };
      Meteor.call('insertCommentData', addComment,function(error){
        if (error)
          return alert(error.reason);
      });
    }else{
      alert("Please write something");
    }
    }
  });

    Template.toemsItem.helpers({
    'selectedClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return "Big"
      }else{
        return "contentMain"
      }
    },
    'BigClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return false
      }else{
        return true
      }
    },
    'editing':function(){
      return Session.equals('editContentId',this._id);
    },
    'notAnonymous':function(){
      var anonymousCheck= this.author;
      if (anonymousCheck=="Anonymous") {
        return false
      }else{
        return true
      }
    }
  });

    Template.toemsItem.events({
      'click .expandOrCollapse':function(event){
        event.preventDefault();
        $(event.target).parent().prev().toggleClass("contentMain Big");
      }
  });

  Template.myPoemsTemp.helpers({
    'selectedClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return "Big"
      }else{
        return "contentMain"
      }
    },
    'BigClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return false
      }else{
        return true
      }
    },
  'numberPoemGrt':function(){
    var currentUserId=Meteor.userId();
    if (contentsList.find({createdBy: currentUserId, type: 'Poem'}).count()>0) {
    return true
    };
  },
  'editing':function(){
    return Session.equals('editContentId',this._id);
    }
});

    Template.myPoemsTemp.events({
      'click .expandOrCollapse':function(event){
        event.preventDefault();
        $(event.target).parent().prev().toggleClass("contentMain Big");
      }
  });
    
    Template.myToemsTemp.helpers({
    'selectedClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return "Big"
      }else{
        return "contentMain"
      }
    },
    'BigClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return false
      }else{
        return true
      }
    },
    'numberToemGrt':function(){
      var currentUserId=Meteor.userId();
      if (contentsList.find({createdBy: currentUserId, type: 'Short Story'}).count()>0) {
      return true
    };
  },
  'editing':function(){
    return Session.equals('editContentId',this._id);
    }
    });

    Template.myToemsTemp.events({
      'click .expandOrCollapse':function(event){
        event.preventDefault();
        $(event.target).parent().prev().toggleClass("contentMain Big");
      }
  });
//For poem Forums
Template.forumPoem.helpers({
  'currentUserPhoto':function(){
    if (Meteor.user()) {
    return Meteor.user().profile.picture
  };
  },
  'numberOfComments':function(){
    Meteor.subscribe('forumPoemQuotes');
    var currentThreadId=this._id;
    var poemQuotesCount= forumPoemQuotesList.find({forumPoemDiscussionId: currentThreadId}).count();
  return poemQuotesCount
  },
  'ownThread':function(){
    var currentUserId = Meteor.userId();
    if(this.createdBy==currentUserId || this.createdBy== "pJTpffDZGjFEPaTSR"){
    return true
    };
  }
});

Template.forumPoem.events({
  'click .removeForumPoemThread':function(){
      if (confirm("Delete this thread?")) {
    Meteor.call('removeForumPoemThreadData',this._id);};    
  }
});

Template.addPoemThread.events({
  'submit form':function(){
      event.preventDefault();
      var poemForumThreadNameVar= event.target.poemForumThreadArea.value;
      poemForumThreadNameVar= poemForumThreadNameVar.replace(/\r?\n/g, '<br />');
      if (poemForumThreadNameVar!== "") {
      var authorNameVar=Meteor.user().profile.name;
      var createdByNameVar= Meteor.userId();
      var createdAtNameVar= new Date().toLocaleString();
      var authorPhotoNameVar= Meteor.user().profile.picture;
      Meteor.call('insertPoemForumThreadData',poemForumThreadNameVar,authorNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar,function(error){
        if (error)
          return alert(error.reason);
      });
      }else{
        alert("Please write something");
      }   
  }
});


Template.individualPoemThread.helpers({
  'poemForumThread':function(){
    var locationId=location.href.split('/').pop();
    return forumPoemDiscussionsList.findOne(locationId).poemForumThread
  },
  'threadCreatedAt':function(){
    var locationId=location.href.split('/').pop();
    return forumPoemDiscussionsList.findOne(locationId).createdAt
  },
  'authorPhoto':function(){
    var locationId=location.href.split('/').pop();
    return forumPoemDiscussionsList.findOne(locationId).authorPhoto   
  },
  'author':function(){
    var locationId=location.href.split('/').pop();
    return forumPoemDiscussionsList.findOne(locationId).author     
  },
  'currentUserPhoto':function(){
    return Meteor.user().profile.picture
  },
  'numberOfComments':function(){
    var locationId=location.href.split('/').pop();
    return forumPoemQuotesList.find({forumPoemDiscussionId:locationId}).count()
  },
  'ForumPoemQuote':function(){
    var locationId=location.href.split('/').pop();
    return forumPoemQuotesList.find({forumPoemDiscussionId: locationId}).fetch()
  },
  'ownQuote':function(){
    var currentUserId = Meteor.userId();
    if(this.createdBy==currentUserId || this.createdBy== "pJTpffDZGjFEPaTSR"){
    return true
    };
  },
  'editing':function(){
      return Session.equals('editForumPoemQuoteId',this._id);
}
});

Template.individualPoemThread.events({
  'click .removeForumPoemQuote':function(){
    if (confirm("Delete this comment?")) {
    Meteor.call('removeForumPoemQuoteData',this._id);
  };
},
//for editing
    'click .editForumPoemQuote':function(){
      Session.set('editForumPoemQuoteId',this._id);
    },
    'click .cancelForumQuote':function(){
      Session.set('editForumPoemQuoteId',null);
    },
    'click .saveForumQuote':function(){
      var editForumPoemQuoteId=Session.get('editForumPoemQuoteId');
      var poemForumQuoteEditNameVar= document.getElementById("poemForumQuoteEdit").value;
      poemForumQuoteEditNameVar= poemForumQuoteEditNameVar.replace(/\r?\n/g, '<br />');
      var editForumPoemQuote={
      poemForumQuote: poemForumQuoteEditNameVar
      };
      Meteor.call('editForumPoemQuoteData',editForumPoemQuote,editForumPoemQuoteId);
      Session.set('editForumPoemQuoteId',null);
    }
});
//for editing

  Template.addPoemQuote.events({
    'submit form':function(event,template){
      event.preventDefault();
      var poemForumQuoteNamevar= event.target.poemForumQuote.value;
      poemForumQuoteNamevar= poemForumQuoteNamevar.replace(/\r?\n/g, '<br />');
      if (poemForumQuoteNamevar!== "") {
      var authorNameVar=Meteor.user().profile.name;
      var createdByNameVar= Meteor.userId();
      var forumPoemDiscussionIdNameVar=location.href.split('/').pop();
      var authorPhotoNameVar= Meteor.user().profile.picture;
      var createdAtNameVar= new Date().toLocaleString();
      Meteor.call('insertPoemForumQuote', poemForumQuoteNamevar,authorNameVar,forumPoemDiscussionIdNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar,function(error){
        if (error)
          return alert(error.reason);
      });
    }else{
      alert("Please write something");
    }
  }
  });
//For poem Forums

//for short story forums
Template.forumToem.helpers({
  'currentUserPhoto':function(){
    if (Meteor.user()) {
    return Meteor.user().profile.picture
  };
  },
  'numberOfComments':function(){
    Meteor.subscribe('forumToemQuotes');
    var currentThreadId= this._id;
    toemQuotesCount= forumToemQuotesList.find({forumToemDiscussionId: currentThreadId}).count();
    return toemQuotesCount
  },
  'ownThread':function(){
    var currentUserId = Meteor.userId();
    if(this.createdBy==currentUserId || this.createdBy== "pJTpffDZGjFEPaTSR"){
    return true
    };
  }
});

Template.forumToem.events({
  'click .removeForumToemThread':function(){
      if (confirm("Delete this thread?")) {
    Meteor.call('removeForumToemThreadData',this._id);};    
  }
});

Template.addToemThread.events({
  'submit form':function(){
      event.preventDefault();
      var toemForumThreadNameVar= event.target.toemForumThreadArea.value;
      toemForumThreadNameVar= toemForumThreadNameVar.replace(/\r?\n/g, '<br />');
      if (toemForumThreadNameVar!=="") {
      var authorNameVar=Meteor.user().profile.name;
      var createdByNameVar= Meteor.userId();
      var createdAtNameVar= new Date().toLocaleString();
      var authorPhotoNameVar= Meteor.user().profile.picture;
      Meteor.call('insertToemForumThreadData',toemForumThreadNameVar,authorNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar,function(error){
        if (error)
          return alert(error.reason);
      });
      }else{
        alert("Please write something");
      }  
  }
});


Template.individualToemThread.helpers({
  'toemForumThread':function(){
    var locationId=location.href.split('/').pop();
    return forumToemDiscussionsList.findOne(locationId).toemForumThread
  },
  'threadCreatedAt':function(){
    var locationId=location.href.split('/').pop();
    return forumToemDiscussionsList.findOne(locationId).createdAt
  },
  'authorPhoto':function(){
    var locationId=location.href.split('/').pop();
    return forumToemDiscussionsList.findOne(locationId).authorPhoto   
  },
  'author':function(){
    var locationId=location.href.split('/').pop();
    return forumToemDiscussionsList.findOne(locationId).author     
  },
  'currentUserPhoto':function(){
    return Meteor.user().profile.picture
  },
  'numberOfComments':function(){
    var locationId=location.href.split('/').pop();
    return forumToemQuotesList.find({forumToemDiscussionId:locationId}).count()
  },
  'ForumToemQuote':function(){
    var locationId=location.href.split('/').pop();
    return forumToemQuotesList.find({forumToemDiscussionId: locationId}).fetch()
  },
  'ownQuote':function(){
    var currentUserId = Meteor.userId();
    if(this.createdBy==currentUserId || this.createdBy== "pJTpffDZGjFEPaTSR"){
    return true
    };
  },
  'editing':function(){
      return Session.equals('editForumToemQuoteId',this._id);
    }
});

Template.individualToemThread.events({
  'click .removeForumToemQuote':function(){
    if (confirm("Delete this comment?")) {
    Meteor.call('removeForumToemQuoteData',this._id);
  };
},
//for editing
    'click .editForumToemQuote':function(){
      Session.set('editForumToemQuoteId',this._id);
    },
    'click .cancelForumQuote':function(){
      Session.set('editForumToemQuoteId',null);
    },
    'click .saveForumQuote':function(){
      var editForumToemQuoteId=Session.get('editForumToemQuoteId');
      var toemForumQuoteEditNameVar= document.getElementById("toemForumQuoteEdit").value;
      toemForumQuoteEditNameVar= toemForumQuoteEditNameVar.replace(/\r?\n/g, '<br />');
      var editForumToemQuote={
      toemForumQuote: toemForumQuoteEditNameVar
      };
      Meteor.call('editForumToemQuoteData',editForumToemQuote,editForumToemQuoteId);
      Session.set('editForumToemQuoteId',null);
    }
});
//for editing

Template.addToemQuote.events({
  'submit form':function(event,template){
    event.preventDefault();
    var toemForumQuoteNamevar= event.target.toemForumQuote.value;
    toemForumQuoteNamevar= toemForumQuoteNamevar.replace(/\r?\n/g, '<br />');
    if (toemForumQuoteNamevar!=="") {
    var authorNameVar=Meteor.user().profile.name;
    var createdByNameVar= Meteor.userId();
    var forumToemDiscussionIdNameVar=location.href.split('/').pop();
    var authorPhotoNameVar= Meteor.user().profile.picture;
    var createdAtNameVar= new Date().toLocaleString();
    Meteor.call('insertToemForumQuote', toemForumQuoteNamevar,authorNameVar,forumToemDiscussionIdNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar,function(error){
      if (error)
        return alert(error.reason);
    });
    }else{
      alert("Please write something");
    }
    }
  });
  //for short story forums
//fb graph call on client side

Meteor.startup(function() {
  Template.fb_pic.helpers({
  'pic': function() {// helper function to display the pic on the page
    var userProfile;
    userProfile = Meteor.user().profile;
 
    if(userProfile) { // logic to handle logged out state
      return userProfile.picture;
    }
  },
});
  Template.fb_largePic.helpers({  
  'largePic': function() {// helper function to display the large pic on the page
    var userProfile;
    userProfile = Meteor.user().profile;
 
    if(userProfile) { // logic to handle logged out state
      return userProfile.largePicture;
    }
  }
});
});

//fb graph call on client side

//fb graph call for share
//ShareIt.configure({
    //sites: {
        //'facebook': {
            //'appId': 1631655587101288
        //}
    //},
   //useFB: true,
   //useTwitter: false,
   //useGoogle: false,
  //classes: "large btn",
  //iconOnly: false,
  //applyColors: true
//});

//fb graph call for share
// count of contents by user
  Template.profilePage.helpers({
    'profilePagePicture':function(){
      if (Meteor.user()) {
      return Meteor.user().profile.largePicture;      
    };
  },
    'profileUsername':function(){
      if (Meteor.user()) {
      return Meteor.user().profile.name;
    };
    },
    'countOfPoems':function(){
      if (Meteor.user()){
      var currentUserId=Meteor.userId();
      return contentsList.find({createdBy: currentUserId, type: 'Poem'}).count()
    };
    },
    'countOfToems':function(){
      if (Meteor.user()){
      var currentUserId=Meteor.userId();
      return contentsList.find({createdBy: currentUserId, type: 'Short Story'}).count()
    };
    },
    'countOfFollowers':function(){
      if (Meteor.user()) {
      var currentUserId=Meteor.userId();
      return Meteor.users.findOne({_id:currentUserId}).followers.length;
      };   
    },
    'countOfFollowings':function(){
      if (Meteor.user()) {
      var currentUserId=Meteor.userId();
      return Meteor.users.findOne({_id:currentUserId}).followings.length;  
      };   
    },   
    'selectedClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return "Big"
      }else{
        return "contentMain"
      }
    },
    'BigClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return false
      }else{
        return true
      }
    },
    'editing':function(){
      return Session.equals('editContentId',this._id);
    }
  });

    Template.profilePage.events({
    'click .Contents':function(){
      var contentId=this._id;
      Session.set('selectedContent',contentId);
    },
      'click .expandOrCollapse':function(event){
        event.preventDefault();
        $(event.target).parent().prev().toggleClass("contentMain Big");
      }
  });
// count of contents by user

//for following author after submission not working
Meteor.subscribe('followerIds');

  Template.profPageAuthorSubmit.helpers({
    'profilePagePicture':function(){
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];
      var user= Meteor.users.findOne({_id: UserId});
      largePicture= user && user.profile && user.profile.largePicture;
      return largePicture;
  },
    'authorSubmit':function(){
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];
      var user= Meteor.users.findOne({_id: UserId});
      currentUserName= user && user.profile && user.profile.name;
      return currentUserName
  },
    'countOfPoems':function(){
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];  
      return contentsList.find({createdBy: UserId, type: 'Poem', anonymous: false}).count()
    },
    'countOfToems':function(){
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];    
      return contentsList.find({createdBy: UserId, type: 'Short Story', anonymous: false}).count()
    },
    'countOfFollowers':function(){
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];
      var user= Meteor.users.findOne({_id: UserId});
      concernedUser= user && user.followers && user.followers.length;
      return concernedUser;
    },
    'countOfFollowings':function(){
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];
      var user= Meteor.users.findOne({_id: UserId});
      concernedUser= user && user.followings && user.followings.length;
      return concernedUser;
    },
    'notSameUser':function(){
      if (Meteor.user()) {
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];
      if(UserId==Meteor.userId()){
        return false
      }else{
        return true
      };
    };
    },
    'Contents':function(){
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];      
      return contentsList.find({createdBy: UserId, anonymous: false},{sort:{createdAt: -1}})
    },
    'followText':function(){
      var buttonValue;
      var locationArray= location.href.split('/');
      var UserId= locationArray[4];
      var locationUser=Meteor.users.findOne({_id: UserId});
      var locationUserFollowers= locationUser && locationUser.followers;
      var currentUserId=Meteor.userId();
      if(_.include(locationUserFollowers, currentUserId)){
        buttonValue="Unfollow";
      }else{
        buttonValue="Follow";
      };
      return buttonValue
    },
    'selectedClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return "Big"
      }else{
        return "contentMain"
      }
    },
    'BigClass':function(){
      var contentCharacters= this.a;
      var contentLinebreaks= this.contentLines;
      var contentParagraphs= this.contentPs-2;
      var totalCountOfCLPs= contentCharacters+ contentLinebreaks*12+ contentParagraphs*12;
      if (totalCountOfCLPs<60) {
        return false
      }else{
        return true
      }
    },
    'editing':function(){
      return Session.equals('editContentId',this._id);
    }
  });

  Template.profPageAuthorSubmit.events({
    'click #followUnfollow': function(){
      var buttonValue= document.getElementById('followUnfollow').value;
      if (buttonValue=="Follow") {
        document.getElementById('followUnfollow').value="Unfollow";
        var locationArray= location.href.split('/');
        var UserId= locationArray[4];
        var locationUser=Meteor.users.findOne({_id: UserId});
        var currentUserId=Meteor.userId();
        var currentUser=Meteor.user();
        Meteor.call('insertFollowData',UserId,currentUserId);
      }else{
        document.getElementById('followUnfollow').value="Follow";
        var locationArray= location.href.split('/');
        var UserId= locationArray[4];
        var locationUser=Meteor.users.findOne({_id: UserId});
        var currentUserId=Meteor.userId();
        var currentUser=Meteor.user();
        Meteor.call('insertUnfollowData',UserId,currentUserId);
      };
    },
    'click .Contents':function(){
      var contentId=this._id;
      Session.set('selectedContent',contentId);
    },
      'click .expandOrCollapse':function(event){
        event.preventDefault();
        $(event.target).parent().prev().toggleClass("contentMain Big");
      }
  });

Template.loginButtons.events({
    'click #login-buttons-logout' : function (event, template) {
        Meteor.logout(function(err) {
            Router.go('homeTemp');
        });
    }
});

Meteor.subscribe('feedbacks');

Template.feedbackPosts.onRendered(function(){
$("#feedback").animate({ scrollTop: $(document).height() }, "slow");
  return false;
});

Template.feedbackPosts.helpers({
    'feedbackItem':function(){
      //var currentUserId=Meteor.userId();
      return feedbackList.find().fetch()
    },
    'ownFeedback':function(){
    var currentUserId = Meteor.userId();
    if(this.createdBy==currentUserId || this.createdBy== "pJTpffDZGjFEPaTSR"){
    return true
    };
  },   
});

Template.feedbackPosts.events({
  'click .feedbackDelete':function(){
    Meteor.call('removeFeedback', this._id);
  }
})

Template.feedbackSubmit.events({
  'submit form':function(event,template){
    event.preventDefault();
    var feedbackNameVar= event.target.feedback.value;
    var authorNameVar=Meteor.user().profile.name;
    var createdByNameVar= Meteor.userId();
    var createdAtNameVar= new Date().toLocaleString();
    Meteor.call('insertFeedback', feedbackNameVar,authorNameVar,createdAtNameVar,createdByNameVar,function(error){
      if (error)
        return alert(error.reason);
    });
    }
  });

//for routing
poemsTempController = RouteController.extend({
  template: 'poemsTemp',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('contents', this.findOptions());
  },
  Contents: function() {
  return contentsList.find({type: 'Poem'}, this.findOptions());
  },
  data: function() {
  var hasMore = this.Contents().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      Contents: this.Contents(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

toemsTempController = RouteController.extend({
  template: 'toemsTemp',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('contents', this.findOptions());
  },
  Contents: function() {
  return contentsList.find({type: 'Short Story'}, this.findOptions());
  },
  data: function() {
  var hasMore = this.Contents().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      Contents: this.Contents(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

myPoemsTempController = RouteController.extend({
  template: 'myPoemsTemp',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('contents', this.findOptions());
  },
  Contents: function() {
  var currentUserId= Meteor.userId();
  return contentsList.find({createdBy: currentUserId, type: 'Poem'}, this.findOptions());
  },
  data: function() {
  var hasMore = this.Contents().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      Contents: this.Contents(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

myToemsTempController = RouteController.extend({
  template: 'myToemsTemp',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('contents', this.findOptions());
  },
  Contents: function() {
  var currentUserId= Meteor.userId();
  return contentsList.find({createdBy: currentUserId, type: 'Short Story'}, this.findOptions());
  },
  data: function() {
  var hasMore = this.Contents().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      Contents: this.Contents(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

homeTempController = RouteController.extend({
  template: 'homeTemp',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('contents', this.findOptions());
  },
  Contents: function() {
  return contentsList.find({}, this.findOptions());
  },
  data: function() {
  var hasMore = this.Contents().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      Contents: this.Contents(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

profilePageDetailsTempController = RouteController.extend({
  template: 'profilePage',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('contents', this.findOptions());
  },
  Contents: function() {
  var currentUserId= Meteor.userId();
  return contentsList.find({createdBy: currentUserId}, this.findOptions());
  },
  data: function() {
  var hasMore = this.Contents().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      Contents: this.Contents(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

forumPoemController = RouteController.extend({
  template: 'forumPoem',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('forumPoemDiscussions', this.findOptions());
  },
  ForumPoemDiscussion: function() {
  return forumPoemDiscussionsList.find({}, this.findOptions());
  },
  data: function() {
  var hasMore = this.ForumPoemDiscussion().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      ForumPoemDiscussion: this.ForumPoemDiscussion(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

forumToemController = RouteController.extend({
  template: 'forumToem',
  increment: 10,
  contentsLimit: function() {
  return parseInt(this.params.contentsLimit) || this.increment;
  },
  findOptions: function() {
  return {sort: {createdAt: -1}, limit: this.contentsLimit()};
  },
  subscriptions: function() {
  this.ContentsSub = Meteor.subscribe('forumToemDiscussions', this.findOptions());
  },
  ForumToemDiscussion: function() {
  return forumToemDiscussionsList.find({}, this.findOptions());
  },
  data: function() {
  var hasMore = this.ForumToemDiscussion().count() === this.contentsLimit();
  var nextPath = this.route.path({contentsLimit: this.contentsLimit() + this.increment});
  return {
      ForumToemDiscussion: this.ForumToemDiscussion(),
      ready: this.ContentsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
}
});

Router.configure({
  layoutTemplate:'layout',
  loadingTemplate:'loading',
  notFoundtemplate: "notFound",
  progressSpinner : false
});

Router.map(function(){
  Router.route('addPoems',{
    path: '/addAPoem',
    disableProgress: true
  });
  Router.route('addToems',{
    path: '/addAToem',
    disableProgress: true
  });
  Router.route('forumPoem',{
    path: '/forumPoem/:contentsLimit?',
    controller: forumPoemController
  });
  Router.route('forumToem',{
    path: '/forumToem/:contentsLimit?',
    controller: forumToemController
  });
  Router.route('/PoemThread/:_id',{
    name: 'individualPoemThread',
    waitOn: function() {
      return [
      Meteor.subscribe('singleForumPoemDiscussion', this.params._id),
      Meteor.subscribe('forumPoemQuotes', this.params._id)
    ];
   },
   data: function() { return forumPoemDiscussionsList.findOne(this.params._id); 
   }
 });
  Router.route('/ToemThread/:_id',{
    name: 'individualToemThread',
    waitOn: function() {
      return [
      Meteor.subscribe('singleForumToemDiscussion', this.params._id),
      Meteor.subscribe('forumToemQuotes', this.params._id)
    ];
   },
   data: function() { return forumToemDiscussionsList.findOne(this.params._id); 
   }
 });
  Router.route('/content/:_id',{
    name:'homeItemIndividual',
    waitOn: function() {
      return [
      Meteor.subscribe('singleContent', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
   },
   data: function() { return contentsList.findOne(this.params._id); 
   }
    });
  Router.route('profilePage',{
    path: '/profilePage/:contentsLimit?',
    controller: profilePageDetailsTempController
  });
  Router.route('poemsTemp',{
    path: '/poemsTemp/:contentsLimit?',
    controller: poemsTempController
  });
  Router.route('toemsTemp',{
    path: '/toemsTemp/:contentsLimit?',
    controller: toemsTempController
  });
  Router.route('myPoemsTemp',{
    path: '/myPoemsTemp/:contentsLimit?',
    controller: myPoemsTempController
  });
  Router.route('myToemsTemp',{
    path: '/myToemsTemp/:contentsLimit?',
    controller: myToemsTempController
  });
  Router.route('homeTemp',{
    path: '/:contentsLimit?',
    controller: homeTempController
  });
  Router.route('profPageAuthorSubmit',{
    path: '/user/:createdBy',
    waitOn:function(){
      return Meteor.subscribe('allUserData',this.params._id)
    }
    });
  //Router.route('tagsItem',{
    //path: '/tagsTemp/:this',
    //waitOn:function(){
      //return Meteor.subscribe('contents')
    //}
  //});
  });
