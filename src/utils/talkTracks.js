function isTalkTrackDIDInitialized(activeWorkflows, talkTrackDid){
    return Array.isArray(activeWorkflows)
            ? !!activeWorkflows.find(({ iid }) => iid.includes(talkTrackDid))
            : false;
}

export default isTalkTrackDIDInitialized;