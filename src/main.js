import NodeCouchDb from 'node-couchdb';
import TaskStore from './store/TaskStore';
import config from './config/config';

const couch = new NodeCouchDb({
  host: config.couchDBHost,
  protocol: config.couchDBProtocol,
  port: config.couchDBPort,
  auth: config.couchDBAuth
});
const dbName = 'task-list-app';
const viewAll = '_design/view_all/_view/view_all';

async function commandResolver(argument) {

  const { _: command, taskId} = argument;
  
  // if (!TaskStore.isInitialized) {
  //   TaskStore.setName("task-list-app");
  //   await TaskStore.initialize();
  // }

  switch (command[0]) {
    case 'get':
      // console.log('getting data..')
      // const taskList = TaskStore.data.map(item => {
      //   return item
      // })
      const taskList = await couch.get(dbName, viewAll).then( ({ data }) => {
                        let tasks =  data.rows.map((item) => {
                          const { id, value } = item
                          return {
                            id,
                            content: value.content,
                            tags: value.tags,
                            status: value.isDone ? 'completed' : 'active',
                            created_at: value.created_at 
                          }
                        })
                        return tasks;
                      }).catch(e => {
                        throw new Error(e.message);
                      })
      return taskList;
    case 'done':
      // console.log(`setting ${taskId} to done..`);
      // await TaskStore.editItem(`${taskId}`, { status: 'done' })
      //   .then(() => {
      //     return `Task ${taskId} status is set to done!`;
      //   }).catch(err => {
      //     throw new Error(err.message);
      //   })
      const task = await couch.get(dbName, taskId).then( ({ data }) => {
                      return data;
                    }).catch(err => new Error(err.message));
      const updatedTask = await couch.update(dbName, {
        ...task,
        isDone: true
      }).then( ({ data }) => {
        return data;
      })
      return updatedTask;
    case 'refresh': 
      // await TaskStore.watchRemote().then(() => {
      //   return `Task data is updated`;
      // });
      break;
    case 'upload':
      // await TaskStore.upload().then(() => {
      //     return `Local tasks is uploaded!`;
      //   }).catch(err => {
      //     throw new Error(err.message);
      //   })
      break;
    default:
      throw new Error('Command not available, please check your input');
  }
}

/**
 * 
 * @param {*} args
 */
export async function cli(args){

  try {
    const result = await commandResolver(args);
    console.log(result);
  } catch (e) {
    console.log(e);
  }

}
