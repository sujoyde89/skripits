Meteor.startup(function () {

Meteor.users.deny({
  update: function() {
    return true;
  }
});

Meteor.publish('contents',function(options){
return contentsList.find({}, options)
});

Meteor.publish('singleContent',function(id){
return id && contentsList.find(id);
});

Meteor.publish('comments',function(){
  return commentsList.find()
});

Meteor.publish('forumPoemDiscussions',function(options){
return forumPoemDiscussionsList.find({}, options)
});

Meteor.publish('singleForumPoemDiscussion',function(id){
return id && forumPoemDiscussionsList.find(id);
});

Meteor.publish('forumPoemQuotes',function(){
return forumPoemQuotesList.find()
});

Meteor.publish('forumToemDiscussions',function(options){
return forumToemDiscussionsList.find({}, options)
});

Meteor.publish('singleForumToemDiscussion',function(id){
return id && forumToemDiscussionsList.find(id);
});

Meteor.publish('forumToemQuotes',function(){
return forumToemQuotesList.find()
});

//for publishing userdata of facebook
Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {
    fields: 
    {
    _id: 1,
    profile: 1,
    followings: 1,
    followers: 1,
    favourites: 1,
    versascore: 1
  }
});
});
//for publishing userdata of facebook
Meteor.publish('followerIds', function(){
return followersList.find()
});

Meteor.publish('feedbacks', function(){
  return feedbackList.find()
});
});

Meteor.methods({
'insertPoemData':function(themeNameVar,poemNameVar,authorNameVar,createdAtNameVar,createdByNameVar,authorPhotoNameVar,anonymousNameVar,poemNameVarLength,contentLines,contentPs){
 contentsList.insert({
        title:themeNameVar,
        content:poemNameVar,
        applauders:[], 
        applauds:0,
        commentsCount:0,
        author: authorNameVar,
        createdBy: createdByNameVar,
        createdAt:createdAtNameVar,
        authorPhoto:authorPhotoNameVar,
        favourites: 0,
        favouriters: [],
        type: 'Poem',
        anonymous: anonymousNameVar,
        karmicPoints: 0,
        a: poemNameVarLength,
        contentLines: contentLines,
        contentPs: contentPs,
        //tagsLength: tagsLength,
        //tags: tagsNameVarSplit
      });
},

'removeContentData':function(selectedContent){
  contentsList.remove(selectedContent);
},

'modifyContentApplaud':function(contentId,currentUserId,contentCreatedBy){
contentsList.update(contentId,{$inc:{applauds: 1, karmicPoints: 10},$addToSet:{applauders: currentUserId}});
Meteor.users.update({_id: contentCreatedBy},{$inc:{versascore:10}});
},

'modifyContentFavourite':function(contentId,currentUserId,contentCreatedBy){
  contentsList.update(contentId,{$inc:{favourites:1, karmicPoints: 50}, $addToSet:{favouriters: currentUserId}});
  Meteor.users.update({_id: contentCreatedBy},{$inc:{versascore:50},$addToSet:{favourites: contentId}});
},

'editContentData':function(editContent,editContentId){
  contentsList.update(editContentId,{$set: editContent});
},

'insertToemData':function(themeNameVar,toemNameVar,authorNameVar,createdAtNameVar,createdByNameVar,authorPhotoNameVar,anonymousNameVar,toemNameVarLength,contentLines,contentPs){
 contentsList.insert({
        title:themeNameVar,
        content:toemNameVar,
        applauders:[], 
        applauds:0,
        commentsCount:0,
        author:authorNameVar,
        createdBy: createdByNameVar,
        createdAt: createdAtNameVar,
        authorPhoto:authorPhotoNameVar,
        favourites: 0,
        favouriters: [],
        type: 'Short Story',
        anonymous: anonymousNameVar,
        karmicPoints: 0,
        a: toemNameVarLength,
        contentLines: contentLines,
        contentPs: contentPs,
        //tagsLength: tagsLength,
        //tags: tagsNameVarSplit
      });
},

'insertCommentData':function(commentAttributes){
  commentsList.insert(commentAttributes);
},

'removeCommentData':function(commentId){
  commentsList.remove(commentId);
},

//For poem forum
'insertPoemForumThreadData':function(poemForumThreadNameVar,authorNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar){
  forumPoemDiscussionsList.insert({
  poemForumThread: poemForumThreadNameVar,
  poemForumThreadId: this._id,
  author: authorNameVar,
  createdBy: createdByNameVar,
  authorPhoto: authorPhotoNameVar,
  createdAt: createdAtNameVar
  });
},

'insertPoemForumQuote':function(poemForumQuoteNamevar,authorNameVar,forumPoemDiscussionIdNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar){
  forumPoemQuotesList.insert({
  poemForumQuote:poemForumQuoteNamevar,
  author:authorNameVar,
  createdBy: createdByNameVar,
  forumPoemDiscussionId:forumPoemDiscussionIdNameVar,
  authorPhoto: authorPhotoNameVar,
  createdAt:createdAtNameVar
});
},

'removeForumPoemThreadData':function(forumPoemThreadData){
  forumPoemDiscussionsList.remove(forumPoemThreadData);
},

'removeForumPoemQuoteData':function(forumPoemQuoteData){
  forumPoemQuotesList.remove(forumPoemQuoteData);
},

'editForumPoemQuoteData':function(editForumPoemQuote,editForumPoemQuoteId){
  forumPoemQuotesList.update(editForumPoemQuoteId,{$set: editForumPoemQuote});
},
//for poem forum
//for short stories forum
'insertToemForumThreadData':function(toemForumThreadNameVar,authorNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar){
  forumToemDiscussionsList.insert({
  toemForumThread:toemForumThreadNameVar,
  author:authorNameVar,
  createdBy: createdByNameVar,
  authorPhoto: authorPhotoNameVar,
  createdAt:createdAtNameVar
  });
},

'insertToemForumQuote':function(toemForumQuoteNamevar,authorNameVar,forumToemDiscussionIdNameVar,createdAtNameVar,authorPhotoNameVar,createdByNameVar){
forumToemQuotesList.insert({
  toemForumQuote:toemForumQuoteNamevar,
  author:authorNameVar,
  createdBy: createdByNameVar,
  forumToemDiscussionId:forumToemDiscussionIdNameVar,
  authorPhoto: authorPhotoNameVar,
  createdAt:createdAtNameVar
});
},

'removeForumToemThreadData':function(forumToemThreadData){
  forumToemDiscussionsList.remove(forumToemThreadData);
},

'removeForumToemQuoteData':function(forumToemQuoteData){
  forumToemQuotesList.remove(forumToemQuoteData);
},

'editForumToemQuoteData':function(editForumToemQuote,editForumToemQuoteId){
  forumToemQuotesList.update(editForumToemQuoteId,{$set: editForumToemQuote});
},
//for short story forum
'insertFollowData':function(locationUserId,currentUserId){
  Meteor.users.update({_id: currentUserId},{$addToSet:{followings: locationUserId}});
  Meteor.users.update({_id: locationUserId},{$addToSet:{followers: currentUserId}});
  followersList.insert({
    follower:currentUserId,
    following:locationUserId
  });
},
'insertUnfollowData':function(locationUserId,currentUserId){
  Meteor.users.update({_id: currentUserId},{$pull:{followings: locationUserId}});
  Meteor.users.update({_id: locationUserId},{$pull:{followers: currentUserId}});
  followersList.remove({
    follower:currentUserId,
    following:locationUserId
  });
},
'insertFeedback':function(feedbackNameVar,authorNameVar,createdAtNameVar,createdByNameVar){
  feedbackList.insert({
    feedback:feedbackNameVar,
    author:authorNameVar,
    createdAt: createdAtNameVar,
    createdBy:createdByNameVar
});
},
'removeFeedback':function(selectedFeedback){
  feedbackList.remove(selectedFeedback);
}
});


//fb graph call on server side
 
// during new account creation get user picture from Facebook and save it on user object
Accounts.onCreateUser(function(options, user) {
  if(options.profile) {
    options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=small";
    options.profile.largePicture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";    
    user.profile = options.profile; // We still want the default 'profile' behavior.
    user.followings=[];
    user.followers=[];
    user.favourites=[];
    user.versascore= 0;
  }
  return user;
});
//fb graph call on server side
