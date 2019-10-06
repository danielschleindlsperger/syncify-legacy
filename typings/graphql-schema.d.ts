import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Album = {
  __typename?: 'Album'
  id: Scalars['ID']
  name: Scalars['String']
  coverArt?: Maybe<Scalars['String']>
}

export type Artist = {
  __typename?: 'Artist'
  id: Scalars['ID']
  name: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  joinRoom?: Maybe<Room>
}

export type MutationJoinRoomArgs = {
  id: Scalars['ID']
}

export type PlaybackChangedResponse = {
  __typename?: 'PlaybackChangedResponse'
  indexInPlaylist: Scalars['Int']
  song?: Maybe<Song>
}

export enum PlaybackStatus {
  Stopped = 'STOPPED',
  Playing = 'PLAYING',
  Paused = 'PAUSED',
}

export type Playlist = {
  __typename?: 'Playlist'
  songs: Array<Song>
  currentIndex: Scalars['Int']
  currentTimeMs: Scalars['Int']
  playbackStatus?: Maybe<PlaybackStatus>
}

export type Query = {
  __typename?: 'Query'
  getRoom?: Maybe<Room>
}

export type QueryGetRoomArgs = {
  id: Scalars['ID']
}

export type Room = {
  __typename?: 'Room'
  id: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  playlist: Playlist
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type Song = {
  __typename?: 'Song'
  id: Scalars['ID']
  durationMs: Scalars['Int']
  artists: Array<Artist>
  album: Album
}

export type Subscription = {
  __typename?: 'Subscription'
  playBackChangedToNewSong?: Maybe<PlaybackChangedResponse>
}

export type SubscriptionPlayBackChangedToNewSongArgs = {
  id: Scalars['ID']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Room: ResolverTypeWrapper<Room>
  String: ResolverTypeWrapper<Scalars['String']>
  Playlist: ResolverTypeWrapper<Playlist>
  Song: ResolverTypeWrapper<Song>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Artist: ResolverTypeWrapper<Artist>
  Album: ResolverTypeWrapper<Album>
  PlaybackStatus: PlaybackStatus
  Mutation: ResolverTypeWrapper<{}>
  Subscription: ResolverTypeWrapper<{}>
  PlaybackChangedResponse: ResolverTypeWrapper<PlaybackChangedResponse>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  ID: Scalars['ID']
  Room: Room
  String: Scalars['String']
  Playlist: Playlist
  Song: Song
  Int: Scalars['Int']
  Artist: Artist
  Album: Album
  PlaybackStatus: PlaybackStatus
  Mutation: {}
  Subscription: {}
  PlaybackChangedResponse: PlaybackChangedResponse
  Boolean: Scalars['Boolean']
}

export type AlbumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  coverArt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type ArtistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  joinRoom?: Resolver<
    Maybe<ResolversTypes['Room']>,
    ParentType,
    ContextType,
    RequireFields<MutationJoinRoomArgs, 'id'>
  >
}

export type PlaybackChangedResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlaybackChangedResponse'] = ResolversParentTypes['PlaybackChangedResponse']
> = {
  indexInPlaylist?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  song?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType>
}

export type PlaylistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']
> = {
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>
  currentIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  currentTimeMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  playbackStatus?: Resolver<Maybe<ResolversTypes['PlaybackStatus']>, ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getRoom?: Resolver<
    Maybe<ResolversTypes['Room']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetRoomArgs, 'id'>
  >
}

export type RoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  playlist?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type SongResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  durationMs?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>
  album?: Resolver<ResolversTypes['Album'], ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  playBackChangedToNewSong?: SubscriptionResolver<
    Maybe<ResolversTypes['PlaybackChangedResponse']>,
    'playBackChangedToNewSong',
    ParentType,
    ContextType,
    RequireFields<SubscriptionPlayBackChangedToNewSongArgs, 'id'>
  >
}

export type Resolvers<ContextType = any> = {
  Album?: AlbumResolvers<ContextType>
  Artist?: ArtistResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  PlaybackChangedResponse?: PlaybackChangedResponseResolvers<ContextType>
  Playlist?: PlaylistResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Room?: RoomResolvers<ContextType>
  Song?: SongResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
