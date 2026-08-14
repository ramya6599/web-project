const users = [
    {
        "name": "John Doe",
        "gender": "Male",
        "image": "john.png"
    },
    {
        "name": "Jane Doe",
        "gender": "Female",
        "image": "jane.png"
    }
];

var curIndex = 0;

function toggle() {
    if (curIndex == 0)
        curIndex = 1;
    else
        curIndex = 0;

    document.getElementById("card-image").src = users[curIndex].image;
    document.getElementById("card-name").innerText = users[curIndex].name;
    document.getElementById("card-gender").innerText = users[curIndex].gender;
}

function random() {
    fetch('https://randomuser.me/api')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var detail = data.results[0];

            document.getElementById("card-image").src = detail.picture.large;
            document.getElementById("card-gender").innerText = detail.gender;

            var fullname = detail.name.first + " " + detail.name.last;
            document.getElementById("card-name").innerText = fullname;
        });
}