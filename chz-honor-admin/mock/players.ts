import { Request, Response } from "express";
import { Hero, Player } from "../src/api/types";
import { heros } from "./heros";
import faker from "faker";

faker.locale = "zh_CN";

// 模拟玩家数据
const playerCount = 100;
const playerList: Player[] = [];

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(100000),
    level: faker.random.number(30),
    nickname: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay: genWantoplay(),
    winningstreak: faker.random.number(10)
  });
}

function genWantoplay() {
  let wanttoplay: Set<Hero> = new Set();
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)]);
  }
  return Array.from(wanttoplay);
}

// 路由实现
export const getPlayers = (req: Request, res: Response) => {
  // 从查询参数中获取分页、过滤关键词等参数
  const { accountname, page = 1, limit = 10 } = req.query;

  // 过滤
  let mockList = playerList.filter(item => {
    if (accountname && item.accountname.indexOf(accountname) < 0) {
      return false;
    }
    return true;
  });

  // 分页
  const pageList = mockList.filter(
    (item, index) => index < limit * page && index >= limit * (page - 1)
  );

  console.log(res);

  res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  });
};

export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params;
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      });
    }
  }
  res.json({
    code: 70001,
    message: "没有找到相应得玩家"
  });
};

export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.body;

  res.json({
    code: 20000,
    data: {
      player
    }
  });
};

export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params;
  const { player } = req.body;
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      });
    }
    res.json({
      code: 70001,
      message: "没有找到相应得玩家"
    });
  }
};

export const deletePlayer = (req: Request, res: Response) => {
  res.json({
    code: 20000
  });
};
