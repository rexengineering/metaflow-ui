import { gql } from "@apollo/client";

export const keepAliveMutation = gql`
    mutation keepAlive {
        keepAlive{ status }
    }
`;


export const eventBroadcastSubscription = gql`
    subscription Subscription{
        eventBroadcast {
            data {
                task {
                    iid
                    tid
                    status
                    data {
                        dataId
                        type
                        order
                        label
                        data
                        encrypted
                        validators {
                            type
                            constraint
                        }
                    }

                },
                workflow {
                    iid
                    did
                    status
                    name
                    tasks {
                        iid
                        tid
                        status
                        data {
                            dataId
                            type
                            order
                            label
                            data
                            encrypted
                            validators {
                                type
                                constraint
                            }
                        }
                    }
                    metadata {
                        key
                        value
                    }
                }
            }
            event
        }
    }
`;


/**
 * ToDo:
 * 1. Metadata prop removed due apollo error: cannot return null for a non-nullable object  --  pull latest changes
 * 2. Request Id and Interaction ID are causing problems, a temporary fix was added to avoid this problem, which is sending
 * 3. Remove all interaction stuff
 * 4. What happens with broadcasting when there's an error trying to instantiate a workflow/task - procedure
 * */