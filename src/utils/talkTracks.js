export function mapTalkTracks(talkTracks){

    if (!Array.isArray(talkTracks))
        return null;

    const mappedTalkTracks = talkTracks.map((talktrack) => {
        const {id, status, details: {title, talktrackId, steps: rawSteps}, order, currentStep} = talktrack;
        const activeStatus = "ACTIVE";
        const steps = Array.isArray(rawSteps)
            ? rawSteps.map(({text, actions, title, workflowName, order}) => ({
                speech: text,
                actions,
                title,
                workflowName,
                order,
            }))
            : [];

        return {
            identifier: id,
            title,
            active: status === activeStatus,
            order,
            talktrackId,
            steps,
            currentStep,
        }

    });

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
