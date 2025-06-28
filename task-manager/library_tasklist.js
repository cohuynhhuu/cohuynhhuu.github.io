var sortTaskList = function(tasks) {
    var isArray = Array.isArray(tasks);
    if (isArray) {
        tasks.sort();
    }
    return isArray;
};

var displaySortedTaskList = function(tasks, div, handler) {
    var html = "";
    var isArray = sortTaskList(tasks);

    if (isArray) {
        //create and load html string from sorted array
        for (var i in tasks) {
            html = html.concat("<p>");
            html = html.concat('<span class="task-name">', tasks[i], '</span>');
            html = html.concat('<button class="delete-btn" id="', i, '" title="Delete"><span aria-hidden="true">&times;</span></button>');
            html = html.concat("</p>");
        }
        div.innerHTML = html;

        // get delete buttons, loop and add onclick event handler
        var buttons = div.getElementsByClassName("delete-btn");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = handler;
        }
    }
};

var deleteTask = function(tasks, i) {
    var isArray = sortTaskList(tasks);
    if (isArray) {
        tasks.splice(i, 1);
    }
};

var capitalizeTask = function(task) {
    var first = task.substring(0, 1);
    return first.toUpperCase() + task.substring(1);
};