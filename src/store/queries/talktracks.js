import { gql } from "@apollo/client";

export const getActiveTalkTracks = gql`
    query GetActiveTalktracks {
        talktracks {
            active {
                id
                session_id
                status
                order
                workflow {
                    iid
                }
                details {
                    talktrack_id
                    text
                    title
                    actions {
                        label
                        talktrack_id
                    }
                }
            }
        }
    }
`;

export const startTalkTrack = gql`
    mutation StartTalkTrack($startTalkTrackInput: StartTalkTrackInput!) {
        talktrack {
            start (input: $startTalkTrackInput) {
                status
                talktracks {
                    id
                    session_id
                    status
                    workflow {
                        iid
                    }
                    details {
                        talktrack_id
                        text
                        actions {
                            label
                            talktrack_id
                        }
                    }
                }
                errors {
                    __typename
                    ... on ProblemInterface {
                        message
                    }
                }
            }
        }
    }
`;

export const activateTalkTrack = gql`
    mutation ActivateTalkTrack($activateTalkTrackInput: ActivateTalkTrackInput!) {
        talktrack {
            activate (input: $activateTalkTrackInput) {
                status
                talktrack {
                    id
                    session_id
                    status
                    workflow {
                        iid
                    }
                    details {
                        talktrack_id
                        text
                        actions {
                            label
                            talktrack_id
                        }
                    }
                }
                errors {
                    __typename
                    ... on ProblemInterface {
                        message
                    }
                }
            }
        }
    }
`;