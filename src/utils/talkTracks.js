export function mapTalkTracks(talkTracks){

    if (!Array.isArray(talkTracks))
        return null;

    const mappedTalkTracks = talkTracks.map(({id, status, title, talktrack_id, order, workflow, steps: rawSteps}) => {
        const activeStatus = "ACTIVE";
        const steps = Array.isArray(rawSteps)
            ? rawSteps.map(({step_id, text, actions, title, status}) => ({
                identifier: step_id,
                speech: text,
                actions,
                title,
                active: status === activeStatus
            }))
            : [];
        const iid = workflow?.iid ?? null;

        return {
            identifier: id,
            title,
            active: status === activeStatus,
            workflow: iid,
            order,
            talktrack_id,
            steps
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
