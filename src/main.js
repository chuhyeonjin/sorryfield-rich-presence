const { default: axios } = require('axios');
const RPC = require('discord-rpc');
const { clientId } = require('../config.json');

const userCountUri = "https://sorry.daldalso.com/java/users";

const client = new RPC.Client({ transport: 'ipc' });

function updataActivity() {
  axios.get(userCountUri).then(response => {
    const userCount = response.data.users.toString()
    const userCountWithComma = userCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    client.setActivity({
      details: `${userCountWithComma}명 플레이중`,
      state: "노래 가사의 초성에 맞게 키를 입력하는 리듬게임 자바!",
      largeImageKey: 'logo',
      largeImageText: 'logo',
      buttons: [
        {
          label: "play java!",
          url: "https://sorry.daldalso.com/java",
        }
      ]
    }).catch(error => {
      console.error(error);
      process.exit(1);
    })
  }).catch(error => {
    console.error(error);
    process.exit(1);
  })
}

client.on('ready', () => {
  console.log('ready')
  updataActivity();

  const intervalTime = 1000 * 60 * 1
  setInterval(() => {
    updataActivity();
  }, intervalTime);
});

client.login({ clientId }).catch(error => {
  console.error(error);
  process.exit(1);
});