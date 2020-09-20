# Task List CLI

Task List CLI is a CLI app to manage tasks from your favorite bash.

## Installation

Use the package manager [npm]() to install Task List CLI.

```bash
npm install task-list-cli
```

## Usage
Use task-list as command.

```bash
task-list get # return existing tasks
task-list refresh # get update
task-list update # send update
task-list done <task-id> # set specific task to done
```

For windows user, if using such command fails, please use
```
node . get
```
inside the directory. Keep in mind that this is a problem that have yet to be resolved.

## Challenges
The challenge of this project lies on implementing the store library and offline-availability. Personally, I'd need further reading and understanding of the library to be able to debug this project. As of now, this app cannot initialize the local database, hence unable to run the rest of the program using the PouchyStore library alone. A NodeCouchDb library is added to at least provide the basic functionality of getting and updating task from remote database. This is a massive blocker on offline-availability and any advise/suggestion is highly appreciated.

## TODOs
Per recent commit, here's todo checklist:
1. Add unit tests
2. Add offline feature

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)