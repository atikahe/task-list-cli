import TaskStore from './store/TaskStore';

async function commandResolver(argument) {

  const { _: command, taskId} = argument;
  
  if (!TaskStore.isInitialized) {
    TaskStore.setName("TaskList");
    await TaskStore.initialize();
  }

  switch (command[0]) {
    case 'get':
      // console.log('getting data..')
      const taskList = TaskStore.data.map(item => {
        return item
      })
      return taskList;
      // break;
    case 'done':
      // console.log(`setting ${taskId} to done..`);
      await TaskStore.editItem(`${taskId}`, { status: 'done' })
        .then(() => {
          return `Task ${taskId} status is set to done!`;
        }).catch(err => {
          throw new Error(err.message);
        })
      break;
    case 'refresh': 
      // console.log(`refreshing data..`);
      await TaskStore.watchRemote().then(() => {
        return `Task data is updated`;
      });
      break;
    case 'upload':
      // console.log(`uploading data..`);
      await TaskStore.upload().then(() => {
          return `Local tasks is uploaded!`;
        }).catch(err => {
          throw new Error(err.message);
        })
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
    await commandResolver(args);
  } catch (e) {
    console.log(e);
  }

}
