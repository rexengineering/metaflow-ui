export function mapTalkTracks(talkTracks){
    if (!Array.isArray(talkTracks))
        return null;
    const mappedTalkTracks = talkTracks.map(({id, status, order, workflow, details : { talktrack_id, text, actions, title }}) => {
        const iid = workflow?.iid ?? null;
        return {
            identifier: id,
            speech: text,
            actions,
            title,
            active: status === "ACTIVE",
            workflow: iid,
            order,
            talktrack_id
        }
    })
    return mappedTalkTracks.sort((talkTrackA, talkTrackB) => {
        const {order: orderA} = talkTrackA;
        const {order: orderB} = talkTrackB;
        if (orderA > orderB)
            return 1;
        if (orderA < orderB)
            return -1;
        return 0;
    });
}

export function getActiveTalkTrackID(talkTracks){
  if (!Array.isArray(talkTracks) || !talkTracks.length) {
      return "";
  }
  const {identifier} = talkTracks.find(({active}) => active) ?? {};
  const [firstTalkTrack] = talkTracks;
  return identifier ?? firstTalkTrack.identifier;
}

export function getActiveTalkTrackWorkflow(talkTracks = [], activeTalkTrackID){
    if (!Array.isArray(talkTracks))
        return null;
    const talkTrack = talkTracks.find(({identifier}) => identifier === activeTalkTrackID);
    return talkTrack?.workflow ?? null;
};
