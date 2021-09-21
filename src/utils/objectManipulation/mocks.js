export const currentTask = {
    "iid": "callworkflow-abc123-1ddcacb0199ff00b",
    "tid": "get_call_data",
    "status": "UP",
    "data": [
        {
            "dataId": "email",
            "type": "TEXT",
            "order": 1,
            "label": "Email",
            "data": "",
            "variant": null,
            "encrypted": false,
            "validators": []
        },
        {
            "dataId": "phone",
            "type": "TEXT",
            "order": 2,
            "label": "Phone",
            "data": "",
            "variant": null,
            "encrypted": false,
            "validators": []
        },
    ]
}

export const updatedTask = {
    "iid": "callworkflow-abc123-1ddcacb0199ff00b",
    "tid": "get_call_data",
    "status": "DOWN",
    "data": [
        {
            "dataId": "email",
            "type": "TEXT",
            "order": 1,
            "label": "e-mail",
            "data": "gabriel.lopex@gmail.com",
            "variant": null,
            "encrypted": false,
            "validators": []
        },
        {
            "dataId": "phone",
            "type": "TEXT",
            "order": 2,
            "label": "Phone",
            "data": "",
            "variant": 'H2',
            "encrypted": true,
            "validators": ["required", "email"]
        },
    ]
}