
const talkTracks = [
    {
        identifier: "buying-123",
        title: "Buying",
        active: true,
        currentStep: 0,
        steps: [{
            speech: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dicta dolor eveniet facere harum incidunt itaque minima minus nam nihil nostrum nulla odio odit officiis placeat quibusdam, recusandae sit tempora!",
            actions: [{
                label: "Selling",
                talktrack_id: "selling-123",
            }],
            title: "Buying part 1",
            order: 0,
            workflowName: "buying-form",
        }]
    },
    {
        identifier: "selling-123",
        title: "Selling",
        active: false,
        currentStep: 0,
        steps: [{
            speech: "adipisicing elit. Debitis dicta doe harum incidunt itaqs nam nihil nostrum nulla odio odit officiis placeat quibusdasit adipisicing elit. Debitis dicta doe harum incidunt itaqs nam nihil nostrum nulla odio odit officiis placeat quibusdasit.",
            title: "Selling 15",
            order: 0,
            workflowName: "buying-form",
        }]
    },
];

export default talkTracks;