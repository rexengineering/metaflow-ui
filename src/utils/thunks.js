export const formatWorkflow = ({ iid, metadata, name, did, tasks }) => {
    const workflow = { iid, name, did, tasks };
    if (!Array.isArray(metadata))
        return workflow;
    const formattedMetadata = metadata.reduce((previousMetadata, currentMetadata) => {
        const { key, value } = currentMetadata;
        return {
            ...previousMetadata,
            [key]: value
        }
    }, {});
    return {
        ...workflow,
        metadata: formattedMetadata,
    }
};