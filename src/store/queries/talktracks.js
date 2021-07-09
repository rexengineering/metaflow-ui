import { gql } from "@apollo/client";

export const getActiveTalkTracks = gql`
    query GetActiveTalktracks {
        talktracks {
            active {
                id
                sessionId
                order
                status
                currentStep
                workflows {
                    iid
                }
                details {
                    talktrackId
                    title
                    steps {
                        title
                        text
                        order
                        workflowName
                        actions {
                            label
                            talktrackId
                        }
                    }
                }
            }
        }
    }
`;

export const startTalkTrack = gql`
    mutation StartTalkTrack($startTalkTrackInput: StartTalkTrackInput!) {
        talktrack {
            start(input: $startTalkTrackInput) {
                status
                talktracks {
                    id
                    sessionId
                    order
                    status
                    workflows {
                        iid
                    }
                    details {
                        talktrackId
                        title
                        steps {
                            text
                            actions {
                                label
                                talktrackId
                            }
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
            activate(input: $activateTalkTrackInput) {
                status
                talktrack {
                    id
                    sessionId
                    order
                    status
                    workflows {
                        iid
                    }
                    details {
                        talktrackId
                        title
                        steps {
                            text
                            actions {
                                label
                                talktrackId
                            }
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

export const setCurrentActiveTalkTrackStep = gql`
    mutation ChangeTalkTrackStep($changeStepTalkTrackInput: ChangeStepTalkTrackInput!) {
        talktrack {
            changeStep (input: $changeStepTalkTrackInput){
                status
                status
                talktrack {
                    id
                    sessionId
                    order
                    status
                    workflows {
                        iid
                    }
                    details {
                        talktrackId
                        title
                        steps {
                            text
                            actions {
                                label
                                talktrackId
                            }
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