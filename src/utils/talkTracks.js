function isTalkTrackDidInitialized(activeWorkflows, talkTrackDid, searchByName = false){
    return Array.isArray(activeWorkflows)
        ? !!activeWorkflows.find(({ did, iid }) => searchByName
                                                      ? iid.includes(talkTrackDid)
                                                      : did === talkTrackDid )
        : false;
}

export default isTalkTrackDidInitialized;