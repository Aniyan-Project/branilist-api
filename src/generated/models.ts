// Generated from schema.graphql. Do not edit manually.
export interface Scalars { ID: string; String: string; Int: number; Float: number; Boolean: boolean; Time: string }
export interface APIInfo { name: string; version: string; schemaUrl: string }
export interface APIInfoSelection { __typename?: boolean; __alias?: Record<string, Omit<APIInfoSelection, '__alias'>>; name?: boolean; version?: boolean; schemaUrl?: boolean }
export interface CatalogFilter { genre?: string | null; yearFrom?: number | null; yearTo?: number | null; season?: Season | null; format?: string | null; status?: CatalogStatus | null }
export type CatalogSort = "ID_DESC" | "POPULARITY_DESC" | "SCORE_DESC" | "TITLE_ASC" | "YEAR_DESC"
export const CatalogSort = {"ID_DESC":"ID_DESC","POPULARITY_DESC":"POPULARITY_DESC","SCORE_DESC":"SCORE_DESC","TITLE_ASC":"TITLE_ASC","YEAR_DESC":"YEAR_DESC"} as const
export type CatalogStatus = "UPCOMING" | "RELEASING" | "FINISHED" | "CANCELLED" | "HIATUS"
export const CatalogStatus = {"UPCOMING":"UPCOMING","RELEASING":"RELEASING","FINISHED":"FINISHED","CANCELLED":"CANCELLED","HIATUS":"HIATUS"} as const
export interface Character { id: string; slug: string; name: string; nativeName: string | null; imageUrl: string | null; description: string | null }
export interface CharacterSelection { __typename?: boolean; __alias?: Record<string, Omit<CharacterSelection, '__alias'>>; id?: boolean; slug?: boolean; name?: boolean; nativeName?: boolean; imageUrl?: boolean; description?: boolean }
export interface CharacterCredit { role: string; character: Character }
export interface CharacterCreditSelection { __typename?: boolean; __alias?: Record<string, Omit<CharacterCreditSelection, '__alias'>>; role?: boolean; character?: CharacterSelection }
export interface CharacterCreditPage { nodes: Array<CharacterCredit>; pageInfo: PageInfo }
export interface CharacterCreditPageSelection { __typename?: boolean; __alias?: Record<string, Omit<CharacterCreditPageSelection, '__alias'>>; nodes?: CharacterCreditSelection; pageInfo?: PageInfoSelection }
export interface Collection { id: string; mediaType: MediaType; name: string; slug: string; description: string | null; color: string; visibility: string; tags: Array<string>; coverMediaId: string | null; position: number; publishedAt: string | null; createdAt: string; updatedAt: string; itemCount: number; items: MediaPage | null }
export interface CollectionItemsArgs { first?: number; offset?: number }
export interface CollectionSelection { __typename?: boolean; __alias?: Record<string, Omit<CollectionSelection, '__alias'>>; id?: boolean; mediaType?: boolean; name?: boolean; slug?: boolean; description?: boolean; color?: boolean; visibility?: boolean; tags?: boolean; coverMediaId?: boolean; position?: boolean; publishedAt?: boolean; createdAt?: boolean; updatedAt?: boolean; itemCount?: boolean; items?: (MediaPageSelection & { __args?: CollectionItemsArgs }) }
export interface CollectionCreateInput { mediaType: MediaType; name: string; description?: string | null; color?: string; visibility?: CollectionVisibility; tags?: Array<string>; coverMediaId?: string | null }
export interface CollectionPage { nodes: Array<Collection>; pageInfo: PageInfo }
export interface CollectionPageSelection { __typename?: boolean; __alias?: Record<string, Omit<CollectionPageSelection, '__alias'>>; nodes?: CollectionSelection; pageInfo?: PageInfoSelection }
export interface CollectionUpdateInput { name: string; description?: string | null; color?: string; visibility?: CollectionVisibility; tags?: Array<string>; coverMediaId?: string | null; position?: number }
export type CollectionVisibility = "PRIVATE" | "UNLISTED" | "PUBLIC"
export const CollectionVisibility = {"PRIVATE":"PRIVATE","UNLISTED":"UNLISTED","PUBLIC":"PUBLIC"} as const
export type CommunityActivityType = "MEDIA_LIST" | "REVIEW" | "FOLLOW" | "PROFILE_POST" | "REPOST"
export const CommunityActivityType = {"MEDIA_LIST":"MEDIA_LIST","REVIEW":"REVIEW","FOLLOW":"FOLLOW","PROFILE_POST":"PROFILE_POST","REPOST":"REPOST"} as const
export interface CommunityAspectInput { story?: number | null; characters?: number | null; visuals?: number | null; sound?: number | null; enjoyment?: number | null }
export interface CommunityAspectScores { story: number | null; characters: number | null; visuals: number | null; sound: number | null; enjoyment: number | null }
export interface CommunityAspectScoresSelection { __typename?: boolean; __alias?: Record<string, Omit<CommunityAspectScoresSelection, '__alias'>>; story?: boolean; characters?: boolean; visuals?: boolean; sound?: boolean; enjoyment?: boolean }
export type CommunityFeedScope = "FOLLOWING" | "GLOBAL"
export const CommunityFeedScope = {"FOLLOWING":"FOLLOWING","GLOBAL":"GLOBAL"} as const
export type CommunityReaction = "HELPFUL" | "INSIGHTFUL" | "WELL_WRITTEN"
export const CommunityReaction = {"HELPFUL":"HELPFUL","INSIGHTFUL":"INSIGHTFUL","WELL_WRITTEN":"WELL_WRITTEN"} as const
export interface CommunityReactionSummary { helpful: number; insightful: number; wellWritten: number; viewerHelpful: boolean; viewerInsightful: boolean; viewerWellWritten: boolean }
export interface CommunityReactionSummarySelection { __typename?: boolean; __alias?: Record<string, Omit<CommunityReactionSummarySelection, '__alias'>>; helpful?: boolean; insightful?: boolean; wellWritten?: boolean; viewerHelpful?: boolean; viewerInsightful?: boolean; viewerWellWritten?: boolean }
export type CommunityRecommendation = "RECOMMENDED" | "MIXED" | "NOT_RECOMMENDED"
export const CommunityRecommendation = {"RECOMMENDED":"RECOMMENDED","MIXED":"MIXED","NOT_RECOMMENDED":"NOT_RECOMMENDED"} as const
export type CommunityReportTarget = "USER" | "REVIEW" | "COMMENT" | "PROFILE_POST" | "FORUM_TOPIC" | "FORUM_POST"
export const CommunityReportTarget = {"USER":"USER","REVIEW":"REVIEW","COMMENT":"COMMENT","PROFILE_POST":"PROFILE_POST","FORUM_TOPIC":"FORUM_TOPIC","FORUM_POST":"FORUM_POST"} as const
export type CommunitySpoilerLevel = "NONE" | "MINOR" | "MAJOR"
export const CommunitySpoilerLevel = {"NONE":"NONE","MINOR":"MINOR","MAJOR":"MAJOR"} as const
export type DarkTheme = "BRANILIST" | "MIDNIGHT" | "AMOLED" | "SLATE"
export const DarkTheme = {"BRANILIST":"BRANILIST","MIDNIGHT":"MIDNIGHT","AMOLED":"AMOLED","SLATE":"SLATE"} as const
export interface Favourite { type: FavouriteType; id: string; position: number; media: Media | null; staff: Staff | null; studio: Studio | null; character: Character | null }
export interface FavouriteSelection { __typename?: boolean; __alias?: Record<string, Omit<FavouriteSelection, '__alias'>>; type?: boolean; id?: boolean; position?: boolean; media?: MediaSelection; staff?: StaffSelection; studio?: StudioSelection; character?: CharacterSelection }
export interface FavouritePage { nodes: Array<Favourite>; pageInfo: PageInfo }
export interface FavouritePageSelection { __typename?: boolean; __alias?: Record<string, Omit<FavouritePageSelection, '__alias'>>; nodes?: FavouriteSelection; pageInfo?: PageInfoSelection }
export interface FavouriteState { type: FavouriteType; id: string; enabled: boolean }
export interface FavouriteStateSelection { __typename?: boolean; __alias?: Record<string, Omit<FavouriteStateSelection, '__alias'>>; type?: boolean; id?: boolean; enabled?: boolean }
export type FavouriteType = "MEDIA" | "STAFF" | "STUDIO" | "CHARACTER"
export const FavouriteType = {"MEDIA":"MEDIA","STAFF":"STAFF","STUDIO":"STUDIO","CHARACTER":"CHARACTER"} as const
export interface ForumCategory { id: string; slug: string; name: string; description: string; icon: string; color: string | null; locked: boolean }
export interface ForumCategorySelection { __typename?: boolean; __alias?: Record<string, Omit<ForumCategorySelection, '__alias'>>; id?: boolean; slug?: boolean; name?: boolean; description?: boolean; icon?: boolean; color?: boolean; locked?: boolean }
export interface ForumCategoryPage { nodes: Array<ForumCategory>; pageInfo: PageInfo }
export interface ForumCategoryPageSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumCategoryPageSelection, '__alias'>>; nodes?: ForumCategorySelection; pageInfo?: PageInfoSelection }
export interface ForumPost { id: string; topicId: string; parentId: string | null; author: SocialActor; body: string; removed: boolean; viewerOwns: boolean; reactions: Array<ForumReactionSummary>; editedAt: string | null; createdAt: string; updatedAt: string }
export interface ForumPostSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumPostSelection, '__alias'>>; id?: boolean; topicId?: boolean; parentId?: boolean; author?: SocialActorSelection; body?: boolean; removed?: boolean; viewerOwns?: boolean; reactions?: ForumReactionSummarySelection; editedAt?: boolean; createdAt?: boolean; updatedAt?: boolean }
export interface ForumPostPage { nodes: Array<ForumPost>; pageInfo: PageInfo }
export interface ForumPostPageSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumPostPageSelection, '__alias'>>; nodes?: ForumPostSelection; pageInfo?: PageInfoSelection }
export type ForumReaction = "LIKE" | "HELPFUL" | "AGREE" | "INSIGHTFUL"
export const ForumReaction = {"LIKE":"LIKE","HELPFUL":"HELPFUL","AGREE":"AGREE","INSIGHTFUL":"INSIGHTFUL"} as const
export interface ForumReactionSummary { type: ForumReaction; count: number; viewerReacted: boolean }
export interface ForumReactionSummarySelection { __typename?: boolean; __alias?: Record<string, Omit<ForumReactionSummarySelection, '__alias'>>; type?: boolean; count?: boolean; viewerReacted?: boolean }
export type ForumSort = "RELEVANCE" | "ACTIVITY" | "POPULARITY" | "NEWEST"
export const ForumSort = {"RELEVANCE":"RELEVANCE","ACTIVITY":"ACTIVITY","POPULARITY":"POPULARITY","NEWEST":"NEWEST"} as const
export interface ForumSpace { id: string; slug: string; name: string; description: string; rules: string; avatarUrl: string | null; bannerUrl: string | null; owner: SocialActor; memberCount: number; topicCount: number; viewerMember: boolean; createdAt: string; updatedAt: string }
export interface ForumSpaceSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumSpaceSelection, '__alias'>>; id?: boolean; slug?: boolean; name?: boolean; description?: boolean; rules?: boolean; avatarUrl?: boolean; bannerUrl?: boolean; owner?: SocialActorSelection; memberCount?: boolean; topicCount?: boolean; viewerMember?: boolean; createdAt?: boolean; updatedAt?: boolean }
export interface ForumSpacePage { nodes: Array<ForumSpace>; pageInfo: PageInfo }
export interface ForumSpacePageSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumSpacePageSelection, '__alias'>>; nodes?: ForumSpaceSelection; pageInfo?: PageInfoSelection }
export type ForumStatus = "OPEN" | "LOCKED"
export const ForumStatus = {"OPEN":"OPEN","LOCKED":"LOCKED"} as const
export interface ForumTag { id: string; slug: string; name: string; description: string; color: string | null }
export interface ForumTagSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumTagSelection, '__alias'>>; id?: boolean; slug?: boolean; name?: boolean; description?: boolean; color?: boolean }
export interface ForumTagPage { nodes: Array<ForumTag>; pageInfo: PageInfo }
export interface ForumTagPageSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumTagPageSelection, '__alias'>>; nodes?: ForumTagSelection; pageInfo?: PageInfoSelection }
export interface ForumTopic { id: string; category: ForumCategory; author: SocialActor; title: string; status: ForumStatus; pinned: boolean; featured: boolean; tags: Array<ForumTag>; spaceSlug: string | null; viewCount: number; postCount: number; viewerSubscribed: boolean; lastPostAt: string; createdAt: string; updatedAt: string; posts: ForumPostPage | null }
export interface ForumTopicPostsArgs { first?: number; offset?: number }
export interface ForumTopicSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumTopicSelection, '__alias'>>; id?: boolean; category?: ForumCategorySelection; author?: SocialActorSelection; title?: boolean; status?: boolean; pinned?: boolean; featured?: boolean; tags?: ForumTagSelection; spaceSlug?: boolean; viewCount?: boolean; postCount?: boolean; viewerSubscribed?: boolean; lastPostAt?: boolean; createdAt?: boolean; updatedAt?: boolean; posts?: (ForumPostPageSelection & { __args?: ForumTopicPostsArgs }) }
export interface ForumTopicFilter { query?: string | null; categorySlug?: string | null; tagSlug?: string | null; spaceSlug?: string | null; status?: ForumStatus | null }
export interface ForumTopicInput { categoryId: string; title: string; body: string; tagIds?: Array<string> }
export interface ForumTopicPage { nodes: Array<ForumTopic>; pageInfo: PageInfo }
export interface ForumTopicPageSelection { __typename?: boolean; __alias?: Record<string, Omit<ForumTopicPageSelection, '__alias'>>; nodes?: ForumTopicSelection; pageInfo?: PageInfoSelection }
export interface Genre { id: string; slug: string; name: string }
export interface GenreSelection { __typename?: boolean; __alias?: Record<string, Omit<GenreSelection, '__alias'>>; id?: boolean; slug?: boolean; name?: boolean }
export interface GenrePage { nodes: Array<Genre>; pageInfo: PageInfo }
export interface GenrePageSelection { __typename?: boolean; __alias?: Record<string, Omit<GenrePageSelection, '__alias'>>; nodes?: GenreSelection; pageInfo?: PageInfoSelection }
export interface HistoryItem { id: string; mediaId: string; eventType: string; status: ListStatus | null; previousStatus: ListStatus | null; progress: number | null; previousProgress: number | null; progressDelta: number | null; score: number | null; repeatCount: number; createdAt: string }
export interface HistoryItemSelection { __typename?: boolean; __alias?: Record<string, Omit<HistoryItemSelection, '__alias'>>; id?: boolean; mediaId?: boolean; eventType?: boolean; status?: boolean; previousStatus?: boolean; progress?: boolean; previousProgress?: boolean; progressDelta?: boolean; score?: boolean; repeatCount?: boolean; createdAt?: boolean }
export interface HistoryPage { nodes: Array<HistoryItem>; pageInfo: PageInfo }
export interface HistoryPageSelection { __typename?: boolean; __alias?: Record<string, Omit<HistoryPageSelection, '__alias'>>; nodes?: HistoryItemSelection; pageInfo?: PageInfoSelection }
export interface InsightBreakdown { key: string; label: string; count: number; percentage: number }
export interface InsightBreakdownSelection { __typename?: boolean; __alias?: Record<string, Omit<InsightBreakdownSelection, '__alias'>>; key?: boolean; label?: boolean; count?: boolean; percentage?: boolean }
export interface LibraryEntry { mediaId: string; status: ListStatus; progress: number; score: number | null; repeatCount: number; startedAt: string | null; completedAt: string | null; private: boolean; updatedAt: string; media: Media | null }
export interface LibraryEntrySelection { __typename?: boolean; __alias?: Record<string, Omit<LibraryEntrySelection, '__alias'>>; mediaId?: boolean; status?: boolean; progress?: boolean; score?: boolean; repeatCount?: boolean; startedAt?: boolean; completedAt?: boolean; private?: boolean; updatedAt?: boolean; media?: MediaSelection }
export interface LibraryEntryInput { status?: ListStatus | null; progress?: number | null; score?: number | null; repeatCount?: number | null; startedAt?: string | null; completedAt?: string | null; private?: boolean | null }
export interface LibraryInsights { mediaCount: number; animeCount: number; mangaCount: number; completedCount: number; episodesConsumed: number; chaptersConsumed: number; estimatedWatchMinutes: number; averageScore: number | null; scoredCount: number; repeatCount: number; genres: Array<InsightBreakdown>; formats: Array<InsightBreakdown>; years: Array<InsightBreakdown>; statuses: Array<InsightBreakdown>; scores: Array<InsightBreakdown>; countries: Array<InsightBreakdown>; studios: Array<InsightBreakdown> }
export interface LibraryInsightsSelection { __typename?: boolean; __alias?: Record<string, Omit<LibraryInsightsSelection, '__alias'>>; mediaCount?: boolean; animeCount?: boolean; mangaCount?: boolean; completedCount?: boolean; episodesConsumed?: boolean; chaptersConsumed?: boolean; estimatedWatchMinutes?: boolean; averageScore?: boolean; scoredCount?: boolean; repeatCount?: boolean; genres?: InsightBreakdownSelection; formats?: InsightBreakdownSelection; years?: InsightBreakdownSelection; statuses?: InsightBreakdownSelection; scores?: InsightBreakdownSelection; countries?: InsightBreakdownSelection; studios?: InsightBreakdownSelection }
export interface LibraryPage { nodes: Array<LibraryEntry>; pageInfo: PageInfo }
export interface LibraryPageSelection { __typename?: boolean; __alias?: Record<string, Omit<LibraryPageSelection, '__alias'>>; nodes?: LibraryEntrySelection; pageInfo?: PageInfoSelection }
export type LibrarySort = "UPDATED" | "TITLE" | "SCORE" | "PROGRESS" | "STARTED" | "COMPLETED"
export const LibrarySort = {"UPDATED":"UPDATED","TITLE":"TITLE","SCORE":"SCORE","PROGRESS":"PROGRESS","STARTED":"STARTED","COMPLETED":"COMPLETED"} as const
export type ListStatus = "PLANNING" | "CURRENT" | "COMPLETED" | "PAUSED" | "DROPPED"
export const ListStatus = {"PLANNING":"PLANNING","CURRENT":"CURRENT","COMPLETED":"COMPLETED","PAUSED":"PAUSED","DROPPED":"DROPPED"} as const
export interface Media { id: string; slug: string; type: MediaType; status: string; format: string; title: MediaTitle; description: string | null; descriptionEnglish: string | null; coverImage: string | null; bannerImage: string | null; episodes: number | null; chapters: number | null; seasonYear: number | null; averageScore: number | null; popularity: number; isAdult: boolean; malId: string | null; anilistId: string | null; genres: GenrePage; relations: MediaRelationPage; studios: StudioCreditPage; staff: StaffCreditPage; characters: CharacterCreditPage; similar: Array<Media>; viewerEntry: LibraryEntry | null }
export interface MediaGenresArgs { first?: number; offset?: number }
export interface MediaRelationsArgs { first?: number; offset?: number }
export interface MediaStudiosArgs { first?: number; offset?: number }
export interface MediaStaffArgs { first?: number; offset?: number }
export interface MediaCharactersArgs { first?: number; offset?: number }
export interface MediaSimilarArgs { first?: number }
export interface MediaSelection { __typename?: boolean; __alias?: Record<string, Omit<MediaSelection, '__alias'>>; id?: boolean; slug?: boolean; type?: boolean; status?: boolean; format?: boolean; title?: MediaTitleSelection; description?: boolean; descriptionEnglish?: boolean; coverImage?: boolean; bannerImage?: boolean; episodes?: boolean; chapters?: boolean; seasonYear?: boolean; averageScore?: boolean; popularity?: boolean; isAdult?: boolean; malId?: boolean; anilistId?: boolean; genres?: (GenrePageSelection & { __args?: MediaGenresArgs }); relations?: (MediaRelationPageSelection & { __args?: MediaRelationsArgs }); studios?: (StudioCreditPageSelection & { __args?: MediaStudiosArgs }); staff?: (StaffCreditPageSelection & { __args?: MediaStaffArgs }); characters?: (CharacterCreditPageSelection & { __args?: MediaCharactersArgs }); similar?: (MediaSelection & { __args?: MediaSimilarArgs }); viewerEntry?: LibraryEntrySelection }
export interface MediaPage { nodes: Array<Media>; pageInfo: PageInfo }
export interface MediaPageSelection { __typename?: boolean; __alias?: Record<string, Omit<MediaPageSelection, '__alias'>>; nodes?: MediaSelection; pageInfo?: PageInfoSelection }
export interface MediaRelation { type: string; mediaId: string; media: Media | null }
export interface MediaRelationSelection { __typename?: boolean; __alias?: Record<string, Omit<MediaRelationSelection, '__alias'>>; type?: boolean; mediaId?: boolean; media?: MediaSelection }
export interface MediaRelationPage { nodes: Array<MediaRelation>; pageInfo: PageInfo }
export interface MediaRelationPageSelection { __typename?: boolean; __alias?: Record<string, Omit<MediaRelationPageSelection, '__alias'>>; nodes?: MediaRelationSelection; pageInfo?: PageInfoSelection }
export interface MediaTitle { romaji: string; english: string | null; native: string | null; portuguese: string | null }
export interface MediaTitleSelection { __typename?: boolean; __alias?: Record<string, Omit<MediaTitleSelection, '__alias'>>; romaji?: boolean; english?: boolean; native?: boolean; portuguese?: boolean }
export type MediaType = "ANIME" | "MANGA"
export const MediaType = {"ANIME":"ANIME","MANGA":"MANGA"} as const
export interface Mutation { createForumTopic: ForumTopic | null; createForumPost: ForumPost | null; updateForumPost: ForumPost | null; deleteForumPost: boolean | null; setForumTopicTags: boolean | null; setForumSubscription: boolean | null; setForumReaction: boolean | null; setForumMembership: boolean | null; setFollow: boolean | null; setBlock: boolean | null; setMute: boolean | null; createPost: SocialPost | null; updatePost: SocialPost | null; deletePost: boolean | null; setPostLike: boolean | null; setPostRepost: boolean | null; setActivityLike: boolean | null; deleteActivity: boolean | null; saveReview: SocialReview | null; deleteReview: boolean | null; setReviewLike: boolean | null; setReviewReaction: boolean | null; createComment: SocialComment | null; deleteComment: boolean | null; setCommentLike: boolean | null; markNotificationRead: boolean | null; markAllNotificationsRead: number | null; saveNotificationPreferences: SocialNotificationPreferences | null; saveNotificationTypePreference: SocialNotificationTypePreference | null; reportContent: ReportReceipt | null; updateProfile: Profile | null; savePreferences: Preferences | null; savePrivacy: PrivacySettings | null; setFavourite: FavouriteState | null; reorderFavourites: boolean | null; createCollection: Collection | null; updateCollection: Collection | null; deleteCollection: boolean | null; setCollectionItem: boolean | null; saveLibraryEntry: LibraryEntry | null; removeLibraryEntry: RemovalResult | null }
export interface MutationCreateForumTopicArgs { input: ForumTopicInput }
export interface MutationCreateForumPostArgs { topicId: string; parentId?: string | null; body: string }
export interface MutationUpdateForumPostArgs { id: string; body: string; reason?: string | null }
export interface MutationDeleteForumPostArgs { id: string }
export interface MutationSetForumTopicTagsArgs { id: string; tagIds: Array<string> }
export interface MutationSetForumSubscriptionArgs { id: string; enabled: boolean }
export interface MutationSetForumReactionArgs { id: string; reaction: ForumReaction; enabled: boolean }
export interface MutationSetForumMembershipArgs { spaceId: string; enabled: boolean }
export interface MutationSetFollowArgs { username: string; enabled: boolean }
export interface MutationSetBlockArgs { username: string; enabled: boolean }
export interface MutationSetMuteArgs { username: string; enabled: boolean }
export interface MutationCreatePostArgs { input: SocialPostInput }
export interface MutationUpdatePostArgs { id: string; body: string }
export interface MutationDeletePostArgs { id: string }
export interface MutationSetPostLikeArgs { id: string; enabled: boolean }
export interface MutationSetPostRepostArgs { id: string; enabled: boolean }
export interface MutationSetActivityLikeArgs { id: string; enabled: boolean }
export interface MutationDeleteActivityArgs { id: string }
export interface MutationSaveReviewArgs { input: SocialReviewInput }
export interface MutationDeleteReviewArgs { id: string }
export interface MutationSetReviewLikeArgs { id: string; enabled: boolean }
export interface MutationSetReviewReactionArgs { id: string; reaction: CommunityReaction; enabled: boolean }
export interface MutationCreateCommentArgs { input: SocialCommentInput }
export interface MutationDeleteCommentArgs { id: string }
export interface MutationSetCommentLikeArgs { id: string; enabled: boolean }
export interface MutationMarkNotificationReadArgs { id: string }
export interface MutationSaveNotificationPreferencesArgs { input: SocialNotificationPreferencesInput }
export interface MutationSaveNotificationTypePreferenceArgs { input: SocialNotificationTypeInput }
export interface MutationReportContentArgs { input: SocialReportInput }
export interface MutationUpdateProfileArgs { input: ProfileInput }
export interface MutationSavePreferencesArgs { input: PreferencesInput }
export interface MutationSavePrivacyArgs { input: PrivacyInput }
export interface MutationSetFavouriteArgs { type: FavouriteType; id: string; enabled: boolean }
export interface MutationReorderFavouritesArgs { type: FavouriteType; ids: Array<string> }
export interface MutationCreateCollectionArgs { input: CollectionCreateInput }
export interface MutationUpdateCollectionArgs { id: string; input: CollectionUpdateInput }
export interface MutationDeleteCollectionArgs { id: string }
export interface MutationSetCollectionItemArgs { collectionId: string; mediaId: string; enabled?: boolean; position?: number; note?: string | null }
export interface MutationSaveLibraryEntryArgs { mediaId: string; input: LibraryEntryInput }
export interface MutationRemoveLibraryEntryArgs { mediaId: string }
export interface MutationSelection { __typename?: boolean; __alias?: Record<string, Omit<MutationSelection, '__alias'>>; createForumTopic?: (ForumTopicSelection & { __args: MutationCreateForumTopicArgs }); createForumPost?: (ForumPostSelection & { __args: MutationCreateForumPostArgs }); updateForumPost?: (ForumPostSelection & { __args: MutationUpdateForumPostArgs }); deleteForumPost?: { __args: MutationDeleteForumPostArgs }; setForumTopicTags?: { __args: MutationSetForumTopicTagsArgs }; setForumSubscription?: { __args: MutationSetForumSubscriptionArgs }; setForumReaction?: { __args: MutationSetForumReactionArgs }; setForumMembership?: { __args: MutationSetForumMembershipArgs }; setFollow?: { __args: MutationSetFollowArgs }; setBlock?: { __args: MutationSetBlockArgs }; setMute?: { __args: MutationSetMuteArgs }; createPost?: (SocialPostSelection & { __args: MutationCreatePostArgs }); updatePost?: (SocialPostSelection & { __args: MutationUpdatePostArgs }); deletePost?: { __args: MutationDeletePostArgs }; setPostLike?: { __args: MutationSetPostLikeArgs }; setPostRepost?: { __args: MutationSetPostRepostArgs }; setActivityLike?: { __args: MutationSetActivityLikeArgs }; deleteActivity?: { __args: MutationDeleteActivityArgs }; saveReview?: (SocialReviewSelection & { __args: MutationSaveReviewArgs }); deleteReview?: { __args: MutationDeleteReviewArgs }; setReviewLike?: { __args: MutationSetReviewLikeArgs }; setReviewReaction?: { __args: MutationSetReviewReactionArgs }; createComment?: (SocialCommentSelection & { __args: MutationCreateCommentArgs }); deleteComment?: { __args: MutationDeleteCommentArgs }; setCommentLike?: { __args: MutationSetCommentLikeArgs }; markNotificationRead?: { __args: MutationMarkNotificationReadArgs }; markAllNotificationsRead?: boolean; saveNotificationPreferences?: (SocialNotificationPreferencesSelection & { __args: MutationSaveNotificationPreferencesArgs }); saveNotificationTypePreference?: (SocialNotificationTypePreferenceSelection & { __args: MutationSaveNotificationTypePreferenceArgs }); reportContent?: (ReportReceiptSelection & { __args: MutationReportContentArgs }); updateProfile?: (ProfileSelection & { __args: MutationUpdateProfileArgs }); savePreferences?: (PreferencesSelection & { __args: MutationSavePreferencesArgs }); savePrivacy?: (PrivacySettingsSelection & { __args: MutationSavePrivacyArgs }); setFavourite?: (FavouriteStateSelection & { __args: MutationSetFavouriteArgs }); reorderFavourites?: { __args: MutationReorderFavouritesArgs }; createCollection?: (CollectionSelection & { __args: MutationCreateCollectionArgs }); updateCollection?: (CollectionSelection & { __args: MutationUpdateCollectionArgs }); deleteCollection?: { __args: MutationDeleteCollectionArgs }; setCollectionItem?: { __args: MutationSetCollectionItemArgs }; saveLibraryEntry?: (LibraryEntrySelection & { __args: MutationSaveLibraryEntryArgs }); removeLibraryEntry?: (RemovalResultSelection & { __args: MutationRemoveLibraryEntryArgs }) }
export type NotificationEmailMode = "OFF" | "IMMEDIATE" | "DAILY"
export const NotificationEmailMode = {"OFF":"OFF","IMMEDIATE":"IMMEDIATE","DAILY":"DAILY"} as const
export interface PageInfo { limit: number; offset: number; hasNextPage: boolean }
export interface PageInfoSelection { __typename?: boolean; __alias?: Record<string, Omit<PageInfoSelection, '__alias'>>; limit?: boolean; offset?: boolean; hasNextPage?: boolean }
export type PostVisibility = "PUBLIC" | "PRIVATE"
export const PostVisibility = {"PUBLIC":"PUBLIC","PRIVATE":"PRIVATE"} as const
export interface Preferences { localeCode: string; titleLanguage: TitleLanguage; theme: Theme; darkTheme: DarkTheme; hideAdultContent: boolean }
export interface PreferencesSelection { __typename?: boolean; __alias?: Record<string, Omit<PreferencesSelection, '__alias'>>; localeCode?: boolean; titleLanguage?: boolean; theme?: boolean; darkTheme?: boolean; hideAdultContent?: boolean }
export interface PreferencesInput { localeCode: string; titleLanguage: TitleLanguage; theme: Theme; darkTheme?: DarkTheme | null; hideAdultContent: boolean }
export interface PrivacyInput { profileVisibility: Visibility; listVisibility: Visibility; activityVisibility: Visibility }
export interface PrivacySettings { profileVisibility: Visibility; listVisibility: Visibility; activityVisibility: Visibility }
export interface PrivacySettingsSelection { __typename?: boolean; __alias?: Record<string, Omit<PrivacySettingsSelection, '__alias'>>; profileVisibility?: boolean; listVisibility?: boolean; activityVisibility?: boolean }
export interface Profile { id: string; username: string; displayName: string; avatarUrl: string | null; bannerUrl: string | null; bio: string | null; createdAt: string }
export interface ProfileSelection { __typename?: boolean; __alias?: Record<string, Omit<ProfileSelection, '__alias'>>; id?: boolean; username?: boolean; displayName?: boolean; avatarUrl?: boolean; bannerUrl?: boolean; bio?: boolean; createdAt?: boolean }
export interface ProfileInput { displayName: string; bio?: string | null; avatarUrl?: string | null; bannerUrl?: string | null; bannerPositionX?: number | null; bannerPositionY?: number | null }
export interface PublicActivity { id: string; type: string; mediaId: string; status: ListStatus | null; progress: number | null; createdAt: string }
export interface PublicActivitySelection { __typename?: boolean; __alias?: Record<string, Omit<PublicActivitySelection, '__alias'>>; id?: boolean; type?: boolean; mediaId?: boolean; status?: boolean; progress?: boolean; createdAt?: boolean }
export interface PublicActivityPage { nodes: Array<PublicActivity>; pageInfo: PageInfo }
export interface PublicActivityPageSelection { __typename?: boolean; __alias?: Record<string, Omit<PublicActivityPageSelection, '__alias'>>; nodes?: PublicActivitySelection; pageInfo?: PageInfoSelection }
export interface Query { forumCategories: ForumCategoryPage | null; forumTags: ForumTagPage | null; forumTopics: ForumTopicPage | null; forumTopic: ForumTopic | null; forumPost: ForumPost | null; forumSpaces: ForumSpacePage | null; forumSpace: ForumSpace | null; review: SocialReview | null; reviews: SocialReviewPage | null; comments: SocialCommentPage | null; post: SocialPost | null; api: APIInfo; media: Media | null; mediaPage: MediaPage; mediaBySlug: Media | null; trendingMedia: Array<Media>; collection: Collection | null; publicCollections: CollectionPage; genres: GenrePage; staff: Staff | null; character: Character | null; studio: Studio | null; user: User | null; viewer: Viewer | null }
export interface QueryForumCategoriesArgs { first?: number; offset?: number }
export interface QueryForumTagsArgs { first?: number; offset?: number }
export interface QueryForumTopicsArgs { filter?: ForumTopicFilter | null; sort?: ForumSort; first?: number; offset?: number }
export interface QueryForumTopicArgs { id: string }
export interface QueryForumPostArgs { id: string }
export interface QueryForumSpacesArgs { first?: number; offset?: number }
export interface QueryForumSpaceArgs { slug: string }
export interface QueryReviewArgs { id: string }
export interface QueryReviewsArgs { mediaId: string; first?: number; offset?: number }
export interface QueryCommentsArgs { mediaId?: string | null; reviewId?: string | null; activityId?: string | null; first?: number; offset?: number }
export interface QueryPostArgs { id: string }
export interface QueryMediaArgs { id?: string | null; malId?: string | null; anilistId?: string | null }
export interface QueryMediaPageArgs { search?: string | null; type?: MediaType | null; first?: number; offset?: number; filter?: CatalogFilter | null; sort?: CatalogSort }
export interface QueryMediaBySlugArgs { slug: string; type: MediaType }
export interface QueryTrendingMediaArgs { type?: MediaType | null; days?: number; first?: number }
export interface QueryCollectionArgs { id: string }
export interface QueryPublicCollectionsArgs { search?: string | null; type?: MediaType | null; first?: number; offset?: number }
export interface QueryGenresArgs { first?: number; offset?: number }
export interface QueryStaffArgs { id: string }
export interface QueryCharacterArgs { id: string }
export interface QueryStudioArgs { id: string }
export interface QueryUserArgs { id?: string | null; username?: string | null }
export interface QuerySelection { __typename?: boolean; __alias?: Record<string, Omit<QuerySelection, '__alias'>>; forumCategories?: (ForumCategoryPageSelection & { __args?: QueryForumCategoriesArgs }); forumTags?: (ForumTagPageSelection & { __args?: QueryForumTagsArgs }); forumTopics?: (ForumTopicPageSelection & { __args?: QueryForumTopicsArgs }); forumTopic?: (ForumTopicSelection & { __args: QueryForumTopicArgs }); forumPost?: (ForumPostSelection & { __args: QueryForumPostArgs }); forumSpaces?: (ForumSpacePageSelection & { __args?: QueryForumSpacesArgs }); forumSpace?: (ForumSpaceSelection & { __args: QueryForumSpaceArgs }); review?: (SocialReviewSelection & { __args: QueryReviewArgs }); reviews?: (SocialReviewPageSelection & { __args: QueryReviewsArgs }); comments?: (SocialCommentPageSelection & { __args?: QueryCommentsArgs }); post?: (SocialPostSelection & { __args: QueryPostArgs }); api?: APIInfoSelection; media?: (MediaSelection & { __args?: QueryMediaArgs }); mediaPage?: (MediaPageSelection & { __args?: QueryMediaPageArgs }); mediaBySlug?: (MediaSelection & { __args: QueryMediaBySlugArgs }); trendingMedia?: (MediaSelection & { __args?: QueryTrendingMediaArgs }); collection?: (CollectionSelection & { __args: QueryCollectionArgs }); publicCollections?: (CollectionPageSelection & { __args?: QueryPublicCollectionsArgs }); genres?: (GenrePageSelection & { __args?: QueryGenresArgs }); staff?: (StaffSelection & { __args: QueryStaffArgs }); character?: (CharacterSelection & { __args: QueryCharacterArgs }); studio?: (StudioSelection & { __args: QueryStudioArgs }); user?: (UserSelection & { __args?: QueryUserArgs }); viewer?: ViewerSelection }
export interface RemovalResult { mediaId: string; removed: boolean }
export interface RemovalResultSelection { __typename?: boolean; __alias?: Record<string, Omit<RemovalResultSelection, '__alias'>>; mediaId?: boolean; removed?: boolean }
export interface ReportReceipt { id: string; status: string; createdAt: string }
export interface ReportReceiptSelection { __typename?: boolean; __alias?: Record<string, Omit<ReportReceiptSelection, '__alias'>>; id?: boolean; status?: boolean; createdAt?: boolean }
export type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL"
export const Season = {"WINTER":"WINTER","SPRING":"SPRING","SUMMER":"SUMMER","FALL":"FALL"} as const
export interface SocialActivity { id: string; type: CommunityActivityType; actor: SocialActor; media: Media | null; targetUser: SocialActor | null; review: SocialReview | null; post: SocialPost | null; status: ListStatus | null; progress: number | null; likeCount: number; commentCount: number; viewerLiked: boolean; createdAt: string }
export interface SocialActivitySelection { __typename?: boolean; __alias?: Record<string, Omit<SocialActivitySelection, '__alias'>>; id?: boolean; type?: boolean; actor?: SocialActorSelection; media?: MediaSelection; targetUser?: SocialActorSelection; review?: SocialReviewSelection; post?: SocialPostSelection; status?: boolean; progress?: boolean; likeCount?: boolean; commentCount?: boolean; viewerLiked?: boolean; createdAt?: boolean }
export interface SocialActivityPage { nodes: Array<SocialActivity>; pageInfo: PageInfo }
export interface SocialActivityPageSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialActivityPageSelection, '__alias'>>; nodes?: SocialActivitySelection; pageInfo?: PageInfoSelection }
export interface SocialActor { id: string; username: string; displayName: string; avatarUrl: string | null }
export interface SocialActorSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialActorSelection, '__alias'>>; id?: boolean; username?: boolean; displayName?: boolean; avatarUrl?: boolean }
export interface SocialActorPage { nodes: Array<SocialActor>; pageInfo: PageInfo }
export interface SocialActorPageSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialActorPageSelection, '__alias'>>; nodes?: SocialActorSelection; pageInfo?: PageInfoSelection }
export interface SocialComment { id: string; author: SocialActor; parentId: string | null; body: string; removed: boolean; likeCount: number; viewerLiked: boolean; createdAt: string; updatedAt: string }
export interface SocialCommentSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialCommentSelection, '__alias'>>; id?: boolean; author?: SocialActorSelection; parentId?: boolean; body?: boolean; removed?: boolean; likeCount?: boolean; viewerLiked?: boolean; createdAt?: boolean; updatedAt?: boolean }
export interface SocialCommentInput { mediaId?: string | null; reviewId?: string | null; activityId?: string | null; parentId?: string | null; body: string }
export interface SocialCommentPage { nodes: Array<SocialComment>; pageInfo: PageInfo }
export interface SocialCommentPageSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialCommentPageSelection, '__alias'>>; nodes?: SocialCommentSelection; pageInfo?: PageInfoSelection }
export interface SocialNotification { id: string; type: string; actor: SocialActor | null; media: Media | null; reviewId: string | null; commentId: string | null; postId: string | null; forumTopicId: string | null; forumPostId: string | null; achievementKey: string | null; preview: string | null; priority: string; readAt: string | null; createdAt: string }
export interface SocialNotificationSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialNotificationSelection, '__alias'>>; id?: boolean; type?: boolean; actor?: SocialActorSelection; media?: MediaSelection; reviewId?: boolean; commentId?: boolean; postId?: boolean; forumTopicId?: boolean; forumPostId?: boolean; achievementKey?: boolean; preview?: boolean; priority?: boolean; readAt?: boolean; createdAt?: boolean }
export interface SocialNotificationPage { nodes: Array<SocialNotification>; pageInfo: PageInfo }
export interface SocialNotificationPageSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialNotificationPageSelection, '__alias'>>; nodes?: SocialNotificationSelection; pageInfo?: PageInfoSelection }
export interface SocialNotificationPreferences { follows: boolean; reviewLikes: boolean; commentLikes: boolean; replies: boolean; reviewComments: boolean; socialPosts: boolean; emailMode: NotificationEmailMode; smartGrouping: boolean; importantOnlyDefault: boolean; quietHoursEnabled: boolean; quietStartMinutes: number; quietEndMinutes: number; quietTimezone: string; showRealtimeIndicator: boolean }
export interface SocialNotificationPreferencesSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialNotificationPreferencesSelection, '__alias'>>; follows?: boolean; reviewLikes?: boolean; commentLikes?: boolean; replies?: boolean; reviewComments?: boolean; socialPosts?: boolean; emailMode?: boolean; smartGrouping?: boolean; importantOnlyDefault?: boolean; quietHoursEnabled?: boolean; quietStartMinutes?: boolean; quietEndMinutes?: boolean; quietTimezone?: boolean; showRealtimeIndicator?: boolean }
export interface SocialNotificationPreferencesInput { follows: boolean; reviewLikes: boolean; commentLikes: boolean; replies: boolean; reviewComments: boolean; socialPosts: boolean; emailMode: NotificationEmailMode; smartGrouping: boolean; importantOnlyDefault: boolean; quietHoursEnabled: boolean; quietStartMinutes: number; quietEndMinutes: number; quietTimezone: string; showRealtimeIndicator: boolean }
export interface SocialNotificationTypeInput { type: string; inAppEnabled: boolean; emailEnabled: boolean; mutedUntil?: string | null }
export interface SocialNotificationTypePreference { type: string; inAppEnabled: boolean; emailEnabled: boolean; mutedUntil: string | null }
export interface SocialNotificationTypePreferenceSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialNotificationTypePreferenceSelection, '__alias'>>; type?: boolean; inAppEnabled?: boolean; emailEnabled?: boolean; mutedUntil?: boolean }
export interface SocialPost { id: string; author: SocialActor; body: string; visibility: PostVisibility; recipientId: string | null; parentId: string | null; quotedPost: SocialPost | null; images: Array<string>; likeCount: number; replyCount: number; repostCount: number; viewerLiked: boolean; viewerReposted: boolean; createdAt: string; updatedAt: string; replies: SocialPostPage | null }
export interface SocialPostRepliesArgs { first?: number; offset?: number }
export interface SocialPostSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialPostSelection, '__alias'>>; id?: boolean; author?: SocialActorSelection; body?: boolean; visibility?: boolean; recipientId?: boolean; parentId?: boolean; quotedPost?: SocialPostSelection; images?: boolean; likeCount?: boolean; replyCount?: boolean; repostCount?: boolean; viewerLiked?: boolean; viewerReposted?: boolean; createdAt?: boolean; updatedAt?: boolean; replies?: (SocialPostPageSelection & { __args?: SocialPostRepliesArgs }) }
export interface SocialPostInput { body: string; visibility?: PostVisibility; recipientId?: string | null; parentId?: string | null; quotedPostId?: string | null; images?: Array<string> }
export interface SocialPostPage { nodes: Array<SocialPost>; pageInfo: PageInfo }
export interface SocialPostPageSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialPostPageSelection, '__alias'>>; nodes?: SocialPostSelection; pageInfo?: PageInfoSelection }
export interface SocialReportInput { targetType: CommunityReportTarget; targetId: string; reason: string; details?: string | null }
export interface SocialReview { id: string; author: SocialActor; media: Media | null; title: string | null; body: string; recommendation: CommunityRecommendation; spoilerLevel: CommunitySpoilerLevel; aspects: CommunityAspectScores; reactions: CommunityReactionSummary; likeCount: number; commentCount: number; viewerLiked: boolean; createdAt: string; updatedAt: string }
export interface SocialReviewSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialReviewSelection, '__alias'>>; id?: boolean; author?: SocialActorSelection; media?: MediaSelection; title?: boolean; body?: boolean; recommendation?: boolean; spoilerLevel?: boolean; aspects?: CommunityAspectScoresSelection; reactions?: CommunityReactionSummarySelection; likeCount?: boolean; commentCount?: boolean; viewerLiked?: boolean; createdAt?: boolean; updatedAt?: boolean }
export interface SocialReviewInput { mediaId: string; title?: string | null; body: string; recommendation: CommunityRecommendation; spoilerLevel?: CommunitySpoilerLevel; aspects?: CommunityAspectInput | null }
export interface SocialReviewPage { nodes: Array<SocialReview>; pageInfo: PageInfo }
export interface SocialReviewPageSelection { __typename?: boolean; __alias?: Record<string, Omit<SocialReviewPageSelection, '__alias'>>; nodes?: SocialReviewSelection; pageInfo?: PageInfoSelection }
export interface Staff { id: string; slug: string; name: string; nativeName: string | null; imageUrl: string | null; bio: string | null }
export interface StaffSelection { __typename?: boolean; __alias?: Record<string, Omit<StaffSelection, '__alias'>>; id?: boolean; slug?: boolean; name?: boolean; nativeName?: boolean; imageUrl?: boolean; bio?: boolean }
export interface StaffCredit { role: string; roleGroup: string; staff: Staff }
export interface StaffCreditSelection { __typename?: boolean; __alias?: Record<string, Omit<StaffCreditSelection, '__alias'>>; role?: boolean; roleGroup?: boolean; staff?: StaffSelection }
export interface StaffCreditPage { nodes: Array<StaffCredit>; pageInfo: PageInfo }
export interface StaffCreditPageSelection { __typename?: boolean; __alias?: Record<string, Omit<StaffCreditPageSelection, '__alias'>>; nodes?: StaffCreditSelection; pageInfo?: PageInfoSelection }
export interface Studio { id: string; slug: string; name: string; websiteUrl: string | null; countryCode: string | null; description: string | null; logoUrl: string | null }
export interface StudioSelection { __typename?: boolean; __alias?: Record<string, Omit<StudioSelection, '__alias'>>; id?: boolean; slug?: boolean; name?: boolean; websiteUrl?: boolean; countryCode?: boolean; description?: boolean; logoUrl?: boolean }
export interface StudioCredit { role: string; isMain: boolean; studio: Studio }
export interface StudioCreditSelection { __typename?: boolean; __alias?: Record<string, Omit<StudioCreditSelection, '__alias'>>; role?: boolean; isMain?: boolean; studio?: StudioSelection }
export interface StudioCreditPage { nodes: Array<StudioCredit>; pageInfo: PageInfo }
export interface StudioCreditPageSelection { __typename?: boolean; __alias?: Record<string, Omit<StudioCreditPageSelection, '__alias'>>; nodes?: StudioCreditSelection; pageInfo?: PageInfoSelection }
export type Theme = "SITE_DEFAULT" | "DARK" | "LIGHT"
export const Theme = {"SITE_DEFAULT":"SITE_DEFAULT","DARK":"DARK","LIGHT":"LIGHT"} as const
export type TitleLanguage = "AUTO" | "ROMAJI" | "ENGLISH" | "NATIVE" | "PORTUGUESE"
export const TitleLanguage = {"AUTO":"AUTO","ROMAJI":"ROMAJI","ENGLISH":"ENGLISH","NATIVE":"NATIVE","PORTUGUESE":"PORTUGUESE"} as const
export interface User { followers: SocialActorPage | null; following: SocialActorPage | null; posts: SocialPostPage | null; reviews: SocialReviewPage | null; id: string; username: string; displayName: string; avatarUrl: string | null; bannerUrl: string | null; bio: string | null; createdAt: string; library: LibraryPage | null; activity: PublicActivityPage | null; collections: CollectionPage | null }
export interface UserFollowersArgs { first?: number; offset?: number }
export interface UserFollowingArgs { first?: number; offset?: number }
export interface UserPostsArgs { first?: number; offset?: number }
export interface UserReviewsArgs { first?: number; offset?: number }
export interface UserLibraryArgs { status?: ListStatus | null; type?: MediaType | null; first?: number; offset?: number }
export interface UserActivityArgs { first?: number; offset?: number }
export interface UserCollectionsArgs { first?: number; offset?: number }
export interface UserSelection { __typename?: boolean; __alias?: Record<string, Omit<UserSelection, '__alias'>>; followers?: (SocialActorPageSelection & { __args?: UserFollowersArgs }); following?: (SocialActorPageSelection & { __args?: UserFollowingArgs }); posts?: (SocialPostPageSelection & { __args?: UserPostsArgs }); reviews?: (SocialReviewPageSelection & { __args?: UserReviewsArgs }); id?: boolean; username?: boolean; displayName?: boolean; avatarUrl?: boolean; bannerUrl?: boolean; bio?: boolean; createdAt?: boolean; library?: (LibraryPageSelection & { __args?: UserLibraryArgs }); activity?: (PublicActivityPageSelection & { __args?: UserActivityArgs }); collections?: (CollectionPageSelection & { __args?: UserCollectionsArgs }) }
export interface Viewer { forumSubscriptions: ForumTopicPage | null; feed: SocialActivityPage | null; followers: SocialActorPage | null; following: SocialActorPage | null; posts: SocialPostPage | null; myReview: SocialReview | null; notifications: SocialNotificationPage | null; unreadNotificationCount: number | null; notificationPreferences: SocialNotificationPreferences | null; notificationTypePreferences: Array<SocialNotificationTypePreference> | null; blockedUsers: SocialActorPage | null; mutedUsers: SocialActorPage | null; id: string; scopes: Array<string>; preferences: Preferences | null; privacy: PrivacySettings | null; libraryInsights: LibraryInsights | null; favourites: FavouritePage | null; recommendations: Array<Media> | null; libraryPage: LibraryPage | null; profile: Profile | null; library: LibraryPage | null; libraryEntry: LibraryEntry | null; activity: HistoryPage | null; collections: CollectionPage | null }
export interface ViewerForumSubscriptionsArgs { first?: number; offset?: number }
export interface ViewerFeedArgs { scope?: CommunityFeedScope; types?: Array<CommunityActivityType>; first?: number; offset?: number }
export interface ViewerFollowersArgs { first?: number; offset?: number }
export interface ViewerFollowingArgs { first?: number; offset?: number }
export interface ViewerPostsArgs { first?: number; offset?: number }
export interface ViewerMyReviewArgs { mediaId: string }
export interface ViewerNotificationsArgs { first?: number; offset?: number }
export interface ViewerBlockedUsersArgs { first?: number; offset?: number }
export interface ViewerMutedUsersArgs { first?: number; offset?: number }
export interface ViewerFavouritesArgs { type: FavouriteType; first?: number; offset?: number }
export interface ViewerRecommendationsArgs { first?: number }
export interface ViewerLibraryPageArgs { search?: string | null; status?: ListStatus | null; type?: MediaType | null; sort?: LibrarySort; first?: number; offset?: number }
export interface ViewerLibraryArgs { status?: ListStatus | null; type?: MediaType | null; first?: number; offset?: number }
export interface ViewerLibraryEntryArgs { mediaId: string }
export interface ViewerActivityArgs { first?: number; offset?: number }
export interface ViewerCollectionsArgs { first?: number; offset?: number }
export interface ViewerSelection { __typename?: boolean; __alias?: Record<string, Omit<ViewerSelection, '__alias'>>; forumSubscriptions?: (ForumTopicPageSelection & { __args?: ViewerForumSubscriptionsArgs }); feed?: (SocialActivityPageSelection & { __args?: ViewerFeedArgs }); followers?: (SocialActorPageSelection & { __args?: ViewerFollowersArgs }); following?: (SocialActorPageSelection & { __args?: ViewerFollowingArgs }); posts?: (SocialPostPageSelection & { __args?: ViewerPostsArgs }); myReview?: (SocialReviewSelection & { __args: ViewerMyReviewArgs }); notifications?: (SocialNotificationPageSelection & { __args?: ViewerNotificationsArgs }); unreadNotificationCount?: boolean; notificationPreferences?: SocialNotificationPreferencesSelection; notificationTypePreferences?: SocialNotificationTypePreferenceSelection; blockedUsers?: (SocialActorPageSelection & { __args?: ViewerBlockedUsersArgs }); mutedUsers?: (SocialActorPageSelection & { __args?: ViewerMutedUsersArgs }); id?: boolean; scopes?: boolean; preferences?: PreferencesSelection; privacy?: PrivacySettingsSelection; libraryInsights?: LibraryInsightsSelection; favourites?: (FavouritePageSelection & { __args: ViewerFavouritesArgs }); recommendations?: (MediaSelection & { __args?: ViewerRecommendationsArgs }); libraryPage?: (LibraryPageSelection & { __args?: ViewerLibraryPageArgs }); profile?: ProfileSelection; library?: (LibraryPageSelection & { __args?: ViewerLibraryArgs }); libraryEntry?: (LibraryEntrySelection & { __args: ViewerLibraryEntryArgs }); activity?: (HistoryPageSelection & { __args?: ViewerActivityArgs }); collections?: (CollectionPageSelection & { __args?: ViewerCollectionsArgs }) }
export type Visibility = "PUBLIC" | "FOLLOWERS" | "PRIVATE"
export const Visibility = {"PUBLIC":"PUBLIC","FOLLOWERS":"FOLLOWERS","PRIVATE":"PRIVATE"} as const
export interface EnumTypes { CatalogSort: CatalogSort; CatalogStatus: CatalogStatus; CollectionVisibility: CollectionVisibility; CommunityActivityType: CommunityActivityType; CommunityFeedScope: CommunityFeedScope; CommunityReaction: CommunityReaction; CommunityRecommendation: CommunityRecommendation; CommunityReportTarget: CommunityReportTarget; CommunitySpoilerLevel: CommunitySpoilerLevel; DarkTheme: DarkTheme; FavouriteType: FavouriteType; ForumReaction: ForumReaction; ForumSort: ForumSort; ForumStatus: ForumStatus; LibrarySort: LibrarySort; ListStatus: ListStatus; MediaType: MediaType; NotificationEmailMode: NotificationEmailMode; PostVisibility: PostVisibility; Season: Season; Theme: Theme; TitleLanguage: TitleLanguage; Visibility: Visibility }
