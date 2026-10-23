// Generated from schema.graphql. Do not edit manually.
export const schema = {
  "objects": {
    "APIInfo": {
      "name": {
        "type": "String!",
        "args": {}
      },
      "version": {
        "type": "String!",
        "args": {}
      },
      "schemaUrl": {
        "type": "String!",
        "args": {}
      }
    },
    "Character": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      },
      "nativeName": {
        "type": "String",
        "args": {}
      },
      "imageUrl": {
        "type": "String",
        "args": {}
      },
      "description": {
        "type": "String",
        "args": {}
      }
    },
    "CharacterCredit": {
      "role": {
        "type": "String!",
        "args": {}
      },
      "character": {
        "type": "Character!",
        "args": {}
      }
    },
    "CharacterCreditPage": {
      "nodes": {
        "type": "[CharacterCredit!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "Collection": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "mediaType": {
        "type": "MediaType!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "description": {
        "type": "String",
        "args": {}
      },
      "color": {
        "type": "String!",
        "args": {}
      },
      "visibility": {
        "type": "String!",
        "args": {}
      },
      "tags": {
        "type": "[String!]!",
        "args": {}
      },
      "coverMediaId": {
        "type": "ID",
        "args": {}
      },
      "position": {
        "type": "Int!",
        "args": {}
      },
      "publishedAt": {
        "type": "Time",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      },
      "itemCount": {
        "type": "Int!",
        "args": {}
      },
      "items": {
        "type": "MediaPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      }
    },
    "CollectionPage": {
      "nodes": {
        "type": "[Collection!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "CommunityAspectScores": {
      "story": {
        "type": "Int",
        "args": {}
      },
      "characters": {
        "type": "Int",
        "args": {}
      },
      "visuals": {
        "type": "Int",
        "args": {}
      },
      "sound": {
        "type": "Int",
        "args": {}
      },
      "enjoyment": {
        "type": "Int",
        "args": {}
      }
    },
    "CommunityReactionSummary": {
      "helpful": {
        "type": "Int!",
        "args": {}
      },
      "insightful": {
        "type": "Int!",
        "args": {}
      },
      "wellWritten": {
        "type": "Int!",
        "args": {}
      },
      "viewerHelpful": {
        "type": "Boolean!",
        "args": {}
      },
      "viewerInsightful": {
        "type": "Boolean!",
        "args": {}
      },
      "viewerWellWritten": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "Favourite": {
      "type": {
        "type": "FavouriteType!",
        "args": {}
      },
      "id": {
        "type": "ID!",
        "args": {}
      },
      "position": {
        "type": "Int!",
        "args": {}
      },
      "media": {
        "type": "Media",
        "args": {}
      },
      "staff": {
        "type": "Staff",
        "args": {}
      },
      "studio": {
        "type": "Studio",
        "args": {}
      },
      "character": {
        "type": "Character",
        "args": {}
      }
    },
    "FavouritePage": {
      "nodes": {
        "type": "[Favourite!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "FavouriteState": {
      "type": {
        "type": "FavouriteType!",
        "args": {}
      },
      "id": {
        "type": "ID!",
        "args": {}
      },
      "enabled": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "ForumCategory": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      },
      "description": {
        "type": "String!",
        "args": {}
      },
      "icon": {
        "type": "String!",
        "args": {}
      },
      "color": {
        "type": "String",
        "args": {}
      },
      "locked": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "ForumCategoryPage": {
      "nodes": {
        "type": "[ForumCategory!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "ForumPost": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "topicId": {
        "type": "ID!",
        "args": {}
      },
      "parentId": {
        "type": "ID",
        "args": {}
      },
      "author": {
        "type": "SocialActor!",
        "args": {}
      },
      "body": {
        "type": "String!",
        "args": {}
      },
      "removed": {
        "type": "Boolean!",
        "args": {}
      },
      "viewerOwns": {
        "type": "Boolean!",
        "args": {}
      },
      "reactions": {
        "type": "[ForumReactionSummary!]!",
        "args": {}
      },
      "editedAt": {
        "type": "Time",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "ForumPostPage": {
      "nodes": {
        "type": "[ForumPost!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "ForumReactionSummary": {
      "type": {
        "type": "ForumReaction!",
        "args": {}
      },
      "count": {
        "type": "Int!",
        "args": {}
      },
      "viewerReacted": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "ForumSpace": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      },
      "description": {
        "type": "String!",
        "args": {}
      },
      "rules": {
        "type": "String!",
        "args": {}
      },
      "avatarUrl": {
        "type": "String",
        "args": {}
      },
      "bannerUrl": {
        "type": "String",
        "args": {}
      },
      "owner": {
        "type": "SocialActor!",
        "args": {}
      },
      "memberCount": {
        "type": "Int!",
        "args": {}
      },
      "topicCount": {
        "type": "Int!",
        "args": {}
      },
      "viewerMember": {
        "type": "Boolean!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "ForumSpacePage": {
      "nodes": {
        "type": "[ForumSpace!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "ForumTag": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      },
      "description": {
        "type": "String!",
        "args": {}
      },
      "color": {
        "type": "String",
        "args": {}
      }
    },
    "ForumTagPage": {
      "nodes": {
        "type": "[ForumTag!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "ForumTopic": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "category": {
        "type": "ForumCategory!",
        "args": {}
      },
      "author": {
        "type": "SocialActor!",
        "args": {}
      },
      "title": {
        "type": "String!",
        "args": {}
      },
      "status": {
        "type": "ForumStatus!",
        "args": {}
      },
      "pinned": {
        "type": "Boolean!",
        "args": {}
      },
      "featured": {
        "type": "Boolean!",
        "args": {}
      },
      "tags": {
        "type": "[ForumTag!]!",
        "args": {}
      },
      "spaceSlug": {
        "type": "String",
        "args": {}
      },
      "viewCount": {
        "type": "Int!",
        "args": {}
      },
      "postCount": {
        "type": "Int!",
        "args": {}
      },
      "viewerSubscribed": {
        "type": "Boolean!",
        "args": {}
      },
      "lastPostAt": {
        "type": "Time!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      },
      "posts": {
        "type": "ForumPostPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      }
    },
    "ForumTopicPage": {
      "nodes": {
        "type": "[ForumTopic!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "Genre": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      }
    },
    "GenrePage": {
      "nodes": {
        "type": "[Genre!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "HistoryItem": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "mediaId": {
        "type": "ID!",
        "args": {}
      },
      "eventType": {
        "type": "String!",
        "args": {}
      },
      "status": {
        "type": "ListStatus",
        "args": {}
      },
      "previousStatus": {
        "type": "ListStatus",
        "args": {}
      },
      "progress": {
        "type": "Int",
        "args": {}
      },
      "previousProgress": {
        "type": "Int",
        "args": {}
      },
      "progressDelta": {
        "type": "Int",
        "args": {}
      },
      "score": {
        "type": "Float",
        "args": {}
      },
      "repeatCount": {
        "type": "Int!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "HistoryPage": {
      "nodes": {
        "type": "[HistoryItem!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "InsightBreakdown": {
      "key": {
        "type": "String!",
        "args": {}
      },
      "label": {
        "type": "String!",
        "args": {}
      },
      "count": {
        "type": "Int!",
        "args": {}
      },
      "percentage": {
        "type": "Float!",
        "args": {}
      }
    },
    "LibraryEntry": {
      "mediaId": {
        "type": "ID!",
        "args": {}
      },
      "status": {
        "type": "ListStatus!",
        "args": {}
      },
      "progress": {
        "type": "Int!",
        "args": {}
      },
      "score": {
        "type": "Float",
        "args": {}
      },
      "repeatCount": {
        "type": "Int!",
        "args": {}
      },
      "startedAt": {
        "type": "Time",
        "args": {}
      },
      "completedAt": {
        "type": "Time",
        "args": {}
      },
      "private": {
        "type": "Boolean!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      },
      "media": {
        "type": "Media",
        "args": {}
      }
    },
    "LibraryInsights": {
      "mediaCount": {
        "type": "Int!",
        "args": {}
      },
      "animeCount": {
        "type": "Int!",
        "args": {}
      },
      "mangaCount": {
        "type": "Int!",
        "args": {}
      },
      "completedCount": {
        "type": "Int!",
        "args": {}
      },
      "episodesConsumed": {
        "type": "Int!",
        "args": {}
      },
      "chaptersConsumed": {
        "type": "Int!",
        "args": {}
      },
      "estimatedWatchMinutes": {
        "type": "Int!",
        "args": {}
      },
      "averageScore": {
        "type": "Float",
        "args": {}
      },
      "scoredCount": {
        "type": "Int!",
        "args": {}
      },
      "repeatCount": {
        "type": "Int!",
        "args": {}
      },
      "genres": {
        "type": "[InsightBreakdown!]!",
        "args": {}
      },
      "formats": {
        "type": "[InsightBreakdown!]!",
        "args": {}
      },
      "years": {
        "type": "[InsightBreakdown!]!",
        "args": {}
      },
      "statuses": {
        "type": "[InsightBreakdown!]!",
        "args": {}
      },
      "scores": {
        "type": "[InsightBreakdown!]!",
        "args": {}
      },
      "countries": {
        "type": "[InsightBreakdown!]!",
        "args": {}
      },
      "studios": {
        "type": "[InsightBreakdown!]!",
        "args": {}
      }
    },
    "LibraryPage": {
      "nodes": {
        "type": "[LibraryEntry!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "Media": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "type": {
        "type": "MediaType!",
        "args": {}
      },
      "status": {
        "type": "String!",
        "args": {}
      },
      "format": {
        "type": "String!",
        "args": {}
      },
      "title": {
        "type": "MediaTitle!",
        "args": {}
      },
      "description": {
        "type": "String",
        "args": {}
      },
      "descriptionEnglish": {
        "type": "String",
        "args": {}
      },
      "coverImage": {
        "type": "String",
        "args": {}
      },
      "bannerImage": {
        "type": "String",
        "args": {}
      },
      "episodes": {
        "type": "Int",
        "args": {}
      },
      "chapters": {
        "type": "Int",
        "args": {}
      },
      "seasonYear": {
        "type": "Int",
        "args": {}
      },
      "averageScore": {
        "type": "Int",
        "args": {}
      },
      "popularity": {
        "type": "Int!",
        "args": {}
      },
      "isAdult": {
        "type": "Boolean!",
        "args": {}
      },
      "malId": {
        "type": "ID",
        "args": {}
      },
      "anilistId": {
        "type": "ID",
        "args": {}
      },
      "genres": {
        "type": "GenrePage!",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "relations": {
        "type": "MediaRelationPage!",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "studios": {
        "type": "StudioCreditPage!",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "staff": {
        "type": "StaffCreditPage!",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "characters": {
        "type": "CharacterCreditPage!",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "similar": {
        "type": "[Media!]!",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "viewerEntry": {
        "type": "LibraryEntry",
        "args": {}
      }
    },
    "MediaPage": {
      "nodes": {
        "type": "[Media!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "MediaRelation": {
      "type": {
        "type": "String!",
        "args": {}
      },
      "mediaId": {
        "type": "ID!",
        "args": {}
      },
      "media": {
        "type": "Media",
        "args": {}
      }
    },
    "MediaRelationPage": {
      "nodes": {
        "type": "[MediaRelation!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "MediaTitle": {
      "romaji": {
        "type": "String!",
        "args": {}
      },
      "english": {
        "type": "String",
        "args": {}
      },
      "native": {
        "type": "String",
        "args": {}
      },
      "portuguese": {
        "type": "String",
        "args": {}
      }
    },
    "Mutation": {
      "createForumTopic": {
        "type": "ForumTopic",
        "args": {
          "input": {
            "type": "ForumTopicInput!",
            "required": true
          }
        }
      },
      "createForumPost": {
        "type": "ForumPost",
        "args": {
          "topicId": {
            "type": "ID!",
            "required": true
          },
          "parentId": {
            "type": "ID",
            "required": false
          },
          "body": {
            "type": "String!",
            "required": true
          }
        }
      },
      "updateForumPost": {
        "type": "ForumPost",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "body": {
            "type": "String!",
            "required": true
          },
          "reason": {
            "type": "String",
            "required": false
          }
        }
      },
      "deleteForumPost": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "setForumTopicTags": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "tagIds": {
            "type": "[ID!]!",
            "required": true
          }
        }
      },
      "setForumSubscription": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setForumReaction": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "reaction": {
            "type": "ForumReaction!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setForumMembership": {
        "type": "Boolean",
        "args": {
          "spaceId": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setFollow": {
        "type": "Boolean",
        "args": {
          "username": {
            "type": "String!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setBlock": {
        "type": "Boolean",
        "args": {
          "username": {
            "type": "String!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setMute": {
        "type": "Boolean",
        "args": {
          "username": {
            "type": "String!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "createPost": {
        "type": "SocialPost",
        "args": {
          "input": {
            "type": "SocialPostInput!",
            "required": true
          }
        }
      },
      "updatePost": {
        "type": "SocialPost",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "body": {
            "type": "String!",
            "required": true
          }
        }
      },
      "deletePost": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "setPostLike": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setPostRepost": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setActivityLike": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "deleteActivity": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "saveReview": {
        "type": "SocialReview",
        "args": {
          "input": {
            "type": "SocialReviewInput!",
            "required": true
          }
        }
      },
      "deleteReview": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "setReviewLike": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "setReviewReaction": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "reaction": {
            "type": "CommunityReaction!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "createComment": {
        "type": "SocialComment",
        "args": {
          "input": {
            "type": "SocialCommentInput!",
            "required": true
          }
        }
      },
      "deleteComment": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "setCommentLike": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "markNotificationRead": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "markAllNotificationsRead": {
        "type": "Int",
        "args": {}
      },
      "saveNotificationPreferences": {
        "type": "SocialNotificationPreferences",
        "args": {
          "input": {
            "type": "SocialNotificationPreferencesInput!",
            "required": true
          }
        }
      },
      "saveNotificationTypePreference": {
        "type": "SocialNotificationTypePreference",
        "args": {
          "input": {
            "type": "SocialNotificationTypeInput!",
            "required": true
          }
        }
      },
      "reportContent": {
        "type": "ReportReceipt",
        "args": {
          "input": {
            "type": "SocialReportInput!",
            "required": true
          }
        }
      },
      "updateProfile": {
        "type": "Profile",
        "args": {
          "input": {
            "type": "ProfileInput!",
            "required": true
          }
        }
      },
      "savePreferences": {
        "type": "Preferences",
        "args": {
          "input": {
            "type": "PreferencesInput!",
            "required": true
          }
        }
      },
      "savePrivacy": {
        "type": "PrivacySettings",
        "args": {
          "input": {
            "type": "PrivacyInput!",
            "required": true
          }
        }
      },
      "setFavourite": {
        "type": "FavouriteState",
        "args": {
          "type": {
            "type": "FavouriteType!",
            "required": true
          },
          "id": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": true
          }
        }
      },
      "reorderFavourites": {
        "type": "Boolean",
        "args": {
          "type": {
            "type": "FavouriteType!",
            "required": true
          },
          "ids": {
            "type": "[ID!]!",
            "required": true
          }
        }
      },
      "createCollection": {
        "type": "Collection",
        "args": {
          "input": {
            "type": "CollectionCreateInput!",
            "required": true
          }
        }
      },
      "updateCollection": {
        "type": "Collection",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          },
          "input": {
            "type": "CollectionUpdateInput!",
            "required": true
          }
        }
      },
      "deleteCollection": {
        "type": "Boolean",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "setCollectionItem": {
        "type": "Boolean",
        "args": {
          "collectionId": {
            "type": "ID!",
            "required": true
          },
          "mediaId": {
            "type": "ID!",
            "required": true
          },
          "enabled": {
            "type": "Boolean!",
            "required": false
          },
          "position": {
            "type": "Int!",
            "required": false
          },
          "note": {
            "type": "String",
            "required": false
          }
        }
      },
      "saveLibraryEntry": {
        "type": "LibraryEntry",
        "args": {
          "mediaId": {
            "type": "ID!",
            "required": true
          },
          "input": {
            "type": "LibraryEntryInput!",
            "required": true
          }
        }
      },
      "removeLibraryEntry": {
        "type": "RemovalResult",
        "args": {
          "mediaId": {
            "type": "ID!",
            "required": true
          }
        }
      }
    },
    "PageInfo": {
      "limit": {
        "type": "Int!",
        "args": {}
      },
      "offset": {
        "type": "Int!",
        "args": {}
      },
      "hasNextPage": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "Preferences": {
      "localeCode": {
        "type": "String!",
        "args": {}
      },
      "titleLanguage": {
        "type": "TitleLanguage!",
        "args": {}
      },
      "theme": {
        "type": "Theme!",
        "args": {}
      },
      "darkTheme": {
        "type": "DarkTheme!",
        "args": {}
      },
      "hideAdultContent": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "PrivacySettings": {
      "profileVisibility": {
        "type": "Visibility!",
        "args": {}
      },
      "listVisibility": {
        "type": "Visibility!",
        "args": {}
      },
      "activityVisibility": {
        "type": "Visibility!",
        "args": {}
      }
    },
    "Profile": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "username": {
        "type": "String!",
        "args": {}
      },
      "displayName": {
        "type": "String!",
        "args": {}
      },
      "avatarUrl": {
        "type": "String",
        "args": {}
      },
      "bannerUrl": {
        "type": "String",
        "args": {}
      },
      "bio": {
        "type": "String",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "PublicActivity": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "type": {
        "type": "String!",
        "args": {}
      },
      "mediaId": {
        "type": "ID!",
        "args": {}
      },
      "status": {
        "type": "ListStatus",
        "args": {}
      },
      "progress": {
        "type": "Int",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "PublicActivityPage": {
      "nodes": {
        "type": "[PublicActivity!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "Query": {
      "forumCategories": {
        "type": "ForumCategoryPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "forumTags": {
        "type": "ForumTagPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "forumTopics": {
        "type": "ForumTopicPage",
        "args": {
          "filter": {
            "type": "ForumTopicFilter",
            "required": false
          },
          "sort": {
            "type": "ForumSort!",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "forumTopic": {
        "type": "ForumTopic",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "forumPost": {
        "type": "ForumPost",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "forumSpaces": {
        "type": "ForumSpacePage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "forumSpace": {
        "type": "ForumSpace",
        "args": {
          "slug": {
            "type": "String!",
            "required": true
          }
        }
      },
      "review": {
        "type": "SocialReview",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "reviews": {
        "type": "SocialReviewPage",
        "args": {
          "mediaId": {
            "type": "ID!",
            "required": true
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "comments": {
        "type": "SocialCommentPage",
        "args": {
          "mediaId": {
            "type": "ID",
            "required": false
          },
          "reviewId": {
            "type": "ID",
            "required": false
          },
          "activityId": {
            "type": "ID",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "post": {
        "type": "SocialPost",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "api": {
        "type": "APIInfo!",
        "args": {}
      },
      "media": {
        "type": "Media",
        "args": {
          "id": {
            "type": "ID",
            "required": false
          },
          "malId": {
            "type": "ID",
            "required": false
          },
          "anilistId": {
            "type": "ID",
            "required": false
          }
        }
      },
      "mediaPage": {
        "type": "MediaPage!",
        "args": {
          "search": {
            "type": "String",
            "required": false
          },
          "type": {
            "type": "MediaType",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          },
          "filter": {
            "type": "CatalogFilter",
            "required": false
          },
          "sort": {
            "type": "CatalogSort!",
            "required": false
          }
        }
      },
      "mediaBySlug": {
        "type": "Media",
        "args": {
          "slug": {
            "type": "String!",
            "required": true
          },
          "type": {
            "type": "MediaType!",
            "required": true
          }
        }
      },
      "trendingMedia": {
        "type": "[Media!]!",
        "args": {
          "type": {
            "type": "MediaType",
            "required": false
          },
          "days": {
            "type": "Int!",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "collection": {
        "type": "Collection",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "publicCollections": {
        "type": "CollectionPage!",
        "args": {
          "search": {
            "type": "String",
            "required": false
          },
          "type": {
            "type": "MediaType",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "genres": {
        "type": "GenrePage!",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "staff": {
        "type": "Staff",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "character": {
        "type": "Character",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "studio": {
        "type": "Studio",
        "args": {
          "id": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "user": {
        "type": "User",
        "args": {
          "id": {
            "type": "ID",
            "required": false
          },
          "username": {
            "type": "String",
            "required": false
          }
        }
      },
      "viewer": {
        "type": "Viewer",
        "args": {}
      }
    },
    "RemovalResult": {
      "mediaId": {
        "type": "ID!",
        "args": {}
      },
      "removed": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "ReportReceipt": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "status": {
        "type": "String!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "SocialActivity": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "type": {
        "type": "CommunityActivityType!",
        "args": {}
      },
      "actor": {
        "type": "SocialActor!",
        "args": {}
      },
      "media": {
        "type": "Media",
        "args": {}
      },
      "targetUser": {
        "type": "SocialActor",
        "args": {}
      },
      "review": {
        "type": "SocialReview",
        "args": {}
      },
      "post": {
        "type": "SocialPost",
        "args": {}
      },
      "status": {
        "type": "ListStatus",
        "args": {}
      },
      "progress": {
        "type": "Int",
        "args": {}
      },
      "likeCount": {
        "type": "Int!",
        "args": {}
      },
      "commentCount": {
        "type": "Int!",
        "args": {}
      },
      "viewerLiked": {
        "type": "Boolean!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "SocialActivityPage": {
      "nodes": {
        "type": "[SocialActivity!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "SocialActor": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "username": {
        "type": "String!",
        "args": {}
      },
      "displayName": {
        "type": "String!",
        "args": {}
      },
      "avatarUrl": {
        "type": "String",
        "args": {}
      }
    },
    "SocialActorPage": {
      "nodes": {
        "type": "[SocialActor!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "SocialComment": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "author": {
        "type": "SocialActor!",
        "args": {}
      },
      "parentId": {
        "type": "ID",
        "args": {}
      },
      "body": {
        "type": "String!",
        "args": {}
      },
      "removed": {
        "type": "Boolean!",
        "args": {}
      },
      "likeCount": {
        "type": "Int!",
        "args": {}
      },
      "viewerLiked": {
        "type": "Boolean!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "SocialCommentPage": {
      "nodes": {
        "type": "[SocialComment!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "SocialNotification": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "type": {
        "type": "String!",
        "args": {}
      },
      "actor": {
        "type": "SocialActor",
        "args": {}
      },
      "media": {
        "type": "Media",
        "args": {}
      },
      "reviewId": {
        "type": "ID",
        "args": {}
      },
      "commentId": {
        "type": "ID",
        "args": {}
      },
      "postId": {
        "type": "ID",
        "args": {}
      },
      "forumTopicId": {
        "type": "ID",
        "args": {}
      },
      "forumPostId": {
        "type": "ID",
        "args": {}
      },
      "achievementKey": {
        "type": "String",
        "args": {}
      },
      "preview": {
        "type": "String",
        "args": {}
      },
      "priority": {
        "type": "String!",
        "args": {}
      },
      "readAt": {
        "type": "Time",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "SocialNotificationPage": {
      "nodes": {
        "type": "[SocialNotification!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "SocialNotificationPreferences": {
      "follows": {
        "type": "Boolean!",
        "args": {}
      },
      "reviewLikes": {
        "type": "Boolean!",
        "args": {}
      },
      "commentLikes": {
        "type": "Boolean!",
        "args": {}
      },
      "replies": {
        "type": "Boolean!",
        "args": {}
      },
      "reviewComments": {
        "type": "Boolean!",
        "args": {}
      },
      "socialPosts": {
        "type": "Boolean!",
        "args": {}
      },
      "emailMode": {
        "type": "NotificationEmailMode!",
        "args": {}
      },
      "smartGrouping": {
        "type": "Boolean!",
        "args": {}
      },
      "importantOnlyDefault": {
        "type": "Boolean!",
        "args": {}
      },
      "quietHoursEnabled": {
        "type": "Boolean!",
        "args": {}
      },
      "quietStartMinutes": {
        "type": "Int!",
        "args": {}
      },
      "quietEndMinutes": {
        "type": "Int!",
        "args": {}
      },
      "quietTimezone": {
        "type": "String!",
        "args": {}
      },
      "showRealtimeIndicator": {
        "type": "Boolean!",
        "args": {}
      }
    },
    "SocialNotificationTypePreference": {
      "type": {
        "type": "String!",
        "args": {}
      },
      "inAppEnabled": {
        "type": "Boolean!",
        "args": {}
      },
      "emailEnabled": {
        "type": "Boolean!",
        "args": {}
      },
      "mutedUntil": {
        "type": "Time",
        "args": {}
      }
    },
    "SocialPost": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "author": {
        "type": "SocialActor!",
        "args": {}
      },
      "body": {
        "type": "String!",
        "args": {}
      },
      "visibility": {
        "type": "PostVisibility!",
        "args": {}
      },
      "recipientId": {
        "type": "ID",
        "args": {}
      },
      "parentId": {
        "type": "ID",
        "args": {}
      },
      "quotedPost": {
        "type": "SocialPost",
        "args": {}
      },
      "images": {
        "type": "[String!]!",
        "args": {}
      },
      "likeCount": {
        "type": "Int!",
        "args": {}
      },
      "replyCount": {
        "type": "Int!",
        "args": {}
      },
      "repostCount": {
        "type": "Int!",
        "args": {}
      },
      "viewerLiked": {
        "type": "Boolean!",
        "args": {}
      },
      "viewerReposted": {
        "type": "Boolean!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      },
      "replies": {
        "type": "SocialPostPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      }
    },
    "SocialPostPage": {
      "nodes": {
        "type": "[SocialPost!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "SocialReview": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "author": {
        "type": "SocialActor!",
        "args": {}
      },
      "media": {
        "type": "Media",
        "args": {}
      },
      "title": {
        "type": "String",
        "args": {}
      },
      "body": {
        "type": "String!",
        "args": {}
      },
      "recommendation": {
        "type": "CommunityRecommendation!",
        "args": {}
      },
      "spoilerLevel": {
        "type": "CommunitySpoilerLevel!",
        "args": {}
      },
      "aspects": {
        "type": "CommunityAspectScores!",
        "args": {}
      },
      "reactions": {
        "type": "CommunityReactionSummary!",
        "args": {}
      },
      "likeCount": {
        "type": "Int!",
        "args": {}
      },
      "commentCount": {
        "type": "Int!",
        "args": {}
      },
      "viewerLiked": {
        "type": "Boolean!",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "updatedAt": {
        "type": "Time!",
        "args": {}
      }
    },
    "SocialReviewPage": {
      "nodes": {
        "type": "[SocialReview!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "Staff": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      },
      "nativeName": {
        "type": "String",
        "args": {}
      },
      "imageUrl": {
        "type": "String",
        "args": {}
      },
      "bio": {
        "type": "String",
        "args": {}
      }
    },
    "StaffCredit": {
      "role": {
        "type": "String!",
        "args": {}
      },
      "roleGroup": {
        "type": "String!",
        "args": {}
      },
      "staff": {
        "type": "Staff!",
        "args": {}
      }
    },
    "StaffCreditPage": {
      "nodes": {
        "type": "[StaffCredit!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "Studio": {
      "id": {
        "type": "ID!",
        "args": {}
      },
      "slug": {
        "type": "String!",
        "args": {}
      },
      "name": {
        "type": "String!",
        "args": {}
      },
      "websiteUrl": {
        "type": "String",
        "args": {}
      },
      "countryCode": {
        "type": "String",
        "args": {}
      },
      "description": {
        "type": "String",
        "args": {}
      },
      "logoUrl": {
        "type": "String",
        "args": {}
      }
    },
    "StudioCredit": {
      "role": {
        "type": "String!",
        "args": {}
      },
      "isMain": {
        "type": "Boolean!",
        "args": {}
      },
      "studio": {
        "type": "Studio!",
        "args": {}
      }
    },
    "StudioCreditPage": {
      "nodes": {
        "type": "[StudioCredit!]!",
        "args": {}
      },
      "pageInfo": {
        "type": "PageInfo!",
        "args": {}
      }
    },
    "User": {
      "followers": {
        "type": "SocialActorPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "following": {
        "type": "SocialActorPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "posts": {
        "type": "SocialPostPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "reviews": {
        "type": "SocialReviewPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "id": {
        "type": "ID!",
        "args": {}
      },
      "username": {
        "type": "String!",
        "args": {}
      },
      "displayName": {
        "type": "String!",
        "args": {}
      },
      "avatarUrl": {
        "type": "String",
        "args": {}
      },
      "bannerUrl": {
        "type": "String",
        "args": {}
      },
      "bio": {
        "type": "String",
        "args": {}
      },
      "createdAt": {
        "type": "Time!",
        "args": {}
      },
      "library": {
        "type": "LibraryPage",
        "args": {
          "status": {
            "type": "ListStatus",
            "required": false
          },
          "type": {
            "type": "MediaType",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "activity": {
        "type": "PublicActivityPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "collections": {
        "type": "CollectionPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      }
    },
    "Viewer": {
      "forumSubscriptions": {
        "type": "ForumTopicPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "feed": {
        "type": "SocialActivityPage",
        "args": {
          "scope": {
            "type": "CommunityFeedScope!",
            "required": false
          },
          "types": {
            "type": "[CommunityActivityType!]!",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "followers": {
        "type": "SocialActorPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "following": {
        "type": "SocialActorPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "posts": {
        "type": "SocialPostPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "myReview": {
        "type": "SocialReview",
        "args": {
          "mediaId": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "notifications": {
        "type": "SocialNotificationPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "unreadNotificationCount": {
        "type": "Int",
        "args": {}
      },
      "notificationPreferences": {
        "type": "SocialNotificationPreferences",
        "args": {}
      },
      "notificationTypePreferences": {
        "type": "[SocialNotificationTypePreference!]",
        "args": {}
      },
      "blockedUsers": {
        "type": "SocialActorPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "mutedUsers": {
        "type": "SocialActorPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "id": {
        "type": "ID!",
        "args": {}
      },
      "scopes": {
        "type": "[String!]!",
        "args": {}
      },
      "preferences": {
        "type": "Preferences",
        "args": {}
      },
      "privacy": {
        "type": "PrivacySettings",
        "args": {}
      },
      "libraryInsights": {
        "type": "LibraryInsights",
        "args": {}
      },
      "favourites": {
        "type": "FavouritePage",
        "args": {
          "type": {
            "type": "FavouriteType!",
            "required": true
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "recommendations": {
        "type": "[Media!]",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "libraryPage": {
        "type": "LibraryPage",
        "args": {
          "search": {
            "type": "String",
            "required": false
          },
          "status": {
            "type": "ListStatus",
            "required": false
          },
          "type": {
            "type": "MediaType",
            "required": false
          },
          "sort": {
            "type": "LibrarySort!",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "profile": {
        "type": "Profile",
        "args": {}
      },
      "library": {
        "type": "LibraryPage",
        "args": {
          "status": {
            "type": "ListStatus",
            "required": false
          },
          "type": {
            "type": "MediaType",
            "required": false
          },
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "libraryEntry": {
        "type": "LibraryEntry",
        "args": {
          "mediaId": {
            "type": "ID!",
            "required": true
          }
        }
      },
      "activity": {
        "type": "HistoryPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      },
      "collections": {
        "type": "CollectionPage",
        "args": {
          "first": {
            "type": "Int!",
            "required": false
          },
          "offset": {
            "type": "Int!",
            "required": false
          }
        }
      }
    }
  },
  "inputs": {
    "CatalogFilter": {
      "genre": {
        "type": "String",
        "required": false
      },
      "yearFrom": {
        "type": "Int",
        "required": false
      },
      "yearTo": {
        "type": "Int",
        "required": false
      },
      "season": {
        "type": "Season",
        "required": false
      },
      "format": {
        "type": "String",
        "required": false
      },
      "status": {
        "type": "CatalogStatus",
        "required": false
      }
    },
    "CollectionCreateInput": {
      "mediaType": {
        "type": "MediaType!",
        "required": true
      },
      "name": {
        "type": "String!",
        "required": true
      },
      "description": {
        "type": "String",
        "required": false
      },
      "color": {
        "type": "String!",
        "required": false
      },
      "visibility": {
        "type": "CollectionVisibility!",
        "required": false
      },
      "tags": {
        "type": "[String!]!",
        "required": false
      },
      "coverMediaId": {
        "type": "ID",
        "required": false
      }
    },
    "CollectionUpdateInput": {
      "name": {
        "type": "String!",
        "required": true
      },
      "description": {
        "type": "String",
        "required": false
      },
      "color": {
        "type": "String!",
        "required": false
      },
      "visibility": {
        "type": "CollectionVisibility!",
        "required": false
      },
      "tags": {
        "type": "[String!]!",
        "required": false
      },
      "coverMediaId": {
        "type": "ID",
        "required": false
      },
      "position": {
        "type": "Int!",
        "required": false
      }
    },
    "CommunityAspectInput": {
      "story": {
        "type": "Int",
        "required": false
      },
      "characters": {
        "type": "Int",
        "required": false
      },
      "visuals": {
        "type": "Int",
        "required": false
      },
      "sound": {
        "type": "Int",
        "required": false
      },
      "enjoyment": {
        "type": "Int",
        "required": false
      }
    },
    "ForumTopicFilter": {
      "query": {
        "type": "String",
        "required": false
      },
      "categorySlug": {
        "type": "String",
        "required": false
      },
      "tagSlug": {
        "type": "String",
        "required": false
      },
      "spaceSlug": {
        "type": "String",
        "required": false
      },
      "status": {
        "type": "ForumStatus",
        "required": false
      }
    },
    "ForumTopicInput": {
      "categoryId": {
        "type": "ID!",
        "required": true
      },
      "title": {
        "type": "String!",
        "required": true
      },
      "body": {
        "type": "String!",
        "required": true
      },
      "tagIds": {
        "type": "[ID!]!",
        "required": false
      }
    },
    "LibraryEntryInput": {
      "status": {
        "type": "ListStatus",
        "required": false
      },
      "progress": {
        "type": "Int",
        "required": false
      },
      "score": {
        "type": "Float",
        "required": false
      },
      "repeatCount": {
        "type": "Int",
        "required": false
      },
      "startedAt": {
        "type": "String",
        "required": false
      },
      "completedAt": {
        "type": "String",
        "required": false
      },
      "private": {
        "type": "Boolean",
        "required": false
      }
    },
    "PreferencesInput": {
      "localeCode": {
        "type": "String!",
        "required": true
      },
      "titleLanguage": {
        "type": "TitleLanguage!",
        "required": true
      },
      "theme": {
        "type": "Theme!",
        "required": true
      },
      "darkTheme": {
        "type": "DarkTheme",
        "required": false
      },
      "hideAdultContent": {
        "type": "Boolean!",
        "required": true
      }
    },
    "PrivacyInput": {
      "profileVisibility": {
        "type": "Visibility!",
        "required": true
      },
      "listVisibility": {
        "type": "Visibility!",
        "required": true
      },
      "activityVisibility": {
        "type": "Visibility!",
        "required": true
      }
    },
    "ProfileInput": {
      "displayName": {
        "type": "String!",
        "required": true
      },
      "bio": {
        "type": "String",
        "required": false
      },
      "avatarUrl": {
        "type": "String",
        "required": false
      },
      "bannerUrl": {
        "type": "String",
        "required": false
      },
      "bannerPositionX": {
        "type": "Int",
        "required": false
      },
      "bannerPositionY": {
        "type": "Int",
        "required": false
      }
    },
    "SocialCommentInput": {
      "mediaId": {
        "type": "ID",
        "required": false
      },
      "reviewId": {
        "type": "ID",
        "required": false
      },
      "activityId": {
        "type": "ID",
        "required": false
      },
      "parentId": {
        "type": "ID",
        "required": false
      },
      "body": {
        "type": "String!",
        "required": true
      }
    },
    "SocialNotificationPreferencesInput": {
      "follows": {
        "type": "Boolean!",
        "required": true
      },
      "reviewLikes": {
        "type": "Boolean!",
        "required": true
      },
      "commentLikes": {
        "type": "Boolean!",
        "required": true
      },
      "replies": {
        "type": "Boolean!",
        "required": true
      },
      "reviewComments": {
        "type": "Boolean!",
        "required": true
      },
      "socialPosts": {
        "type": "Boolean!",
        "required": true
      },
      "emailMode": {
        "type": "NotificationEmailMode!",
        "required": true
      },
      "smartGrouping": {
        "type": "Boolean!",
        "required": true
      },
      "importantOnlyDefault": {
        "type": "Boolean!",
        "required": true
      },
      "quietHoursEnabled": {
        "type": "Boolean!",
        "required": true
      },
      "quietStartMinutes": {
        "type": "Int!",
        "required": true
      },
      "quietEndMinutes": {
        "type": "Int!",
        "required": true
      },
      "quietTimezone": {
        "type": "String!",
        "required": true
      },
      "showRealtimeIndicator": {
        "type": "Boolean!",
        "required": true
      }
    },
    "SocialNotificationTypeInput": {
      "type": {
        "type": "String!",
        "required": true
      },
      "inAppEnabled": {
        "type": "Boolean!",
        "required": true
      },
      "emailEnabled": {
        "type": "Boolean!",
        "required": true
      },
      "mutedUntil": {
        "type": "Time",
        "required": false
      }
    },
    "SocialPostInput": {
      "body": {
        "type": "String!",
        "required": true
      },
      "visibility": {
        "type": "PostVisibility!",
        "required": false
      },
      "recipientId": {
        "type": "ID",
        "required": false
      },
      "parentId": {
        "type": "ID",
        "required": false
      },
      "quotedPostId": {
        "type": "ID",
        "required": false
      },
      "images": {
        "type": "[ID!]!",
        "required": false
      }
    },
    "SocialReportInput": {
      "targetType": {
        "type": "CommunityReportTarget!",
        "required": true
      },
      "targetId": {
        "type": "ID!",
        "required": true
      },
      "reason": {
        "type": "String!",
        "required": true
      },
      "details": {
        "type": "String",
        "required": false
      }
    },
    "SocialReviewInput": {
      "mediaId": {
        "type": "ID!",
        "required": true
      },
      "title": {
        "type": "String",
        "required": false
      },
      "body": {
        "type": "String!",
        "required": true
      },
      "recommendation": {
        "type": "CommunityRecommendation!",
        "required": true
      },
      "spoilerLevel": {
        "type": "CommunitySpoilerLevel!",
        "required": false
      },
      "aspects": {
        "type": "CommunityAspectInput",
        "required": false
      }
    }
  },
  "enums": {
    "CatalogSort": [
      "ID_DESC",
      "POPULARITY_DESC",
      "SCORE_DESC",
      "TITLE_ASC",
      "YEAR_DESC"
    ],
    "CatalogStatus": [
      "UPCOMING",
      "RELEASING",
      "FINISHED",
      "CANCELLED",
      "HIATUS"
    ],
    "CollectionVisibility": [
      "PRIVATE",
      "UNLISTED",
      "PUBLIC"
    ],
    "CommunityActivityType": [
      "MEDIA_LIST",
      "REVIEW",
      "FOLLOW",
      "PROFILE_POST",
      "REPOST"
    ],
    "CommunityFeedScope": [
      "FOLLOWING",
      "GLOBAL"
    ],
    "CommunityReaction": [
      "HELPFUL",
      "INSIGHTFUL",
      "WELL_WRITTEN"
    ],
    "CommunityRecommendation": [
      "RECOMMENDED",
      "MIXED",
      "NOT_RECOMMENDED"
    ],
    "CommunityReportTarget": [
      "USER",
      "REVIEW",
      "COMMENT",
      "PROFILE_POST",
      "FORUM_TOPIC",
      "FORUM_POST"
    ],
    "CommunitySpoilerLevel": [
      "NONE",
      "MINOR",
      "MAJOR"
    ],
    "DarkTheme": [
      "BRANILIST",
      "MIDNIGHT",
      "AMOLED",
      "SLATE"
    ],
    "FavouriteType": [
      "MEDIA",
      "STAFF",
      "STUDIO",
      "CHARACTER"
    ],
    "ForumReaction": [
      "LIKE",
      "HELPFUL",
      "AGREE",
      "INSIGHTFUL"
    ],
    "ForumSort": [
      "RELEVANCE",
      "ACTIVITY",
      "POPULARITY",
      "NEWEST"
    ],
    "ForumStatus": [
      "OPEN",
      "LOCKED"
    ],
    "LibrarySort": [
      "UPDATED",
      "TITLE",
      "SCORE",
      "PROGRESS",
      "STARTED",
      "COMPLETED"
    ],
    "ListStatus": [
      "PLANNING",
      "CURRENT",
      "COMPLETED",
      "PAUSED",
      "DROPPED"
    ],
    "MediaType": [
      "ANIME",
      "MANGA"
    ],
    "NotificationEmailMode": [
      "OFF",
      "IMMEDIATE",
      "DAILY"
    ],
    "PostVisibility": [
      "PUBLIC",
      "PRIVATE"
    ],
    "Season": [
      "WINTER",
      "SPRING",
      "SUMMER",
      "FALL"
    ],
    "Theme": [
      "SITE_DEFAULT",
      "DARK",
      "LIGHT"
    ],
    "TitleLanguage": [
      "AUTO",
      "ROMAJI",
      "ENGLISH",
      "NATIVE",
      "PORTUGUESE"
    ],
    "Visibility": [
      "PUBLIC",
      "FOLLOWERS",
      "PRIVATE"
    ]
  }
} as const
export const schemaHash = '1061479ddd00fd7573bd14ec02a83a57ee64192efa65d5ea862d2ff4219b3df8'
