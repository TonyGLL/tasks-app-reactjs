import React from 'react';

function TaskBanner(props) {
    return (
        <h4 className="bg-primary text-white text-center p-4">
            { props.userName }'s Task App ({ props.taskItems.filter(t => !t.done).length } task to do)
        </h4>
    );
}

export default TaskBanner;