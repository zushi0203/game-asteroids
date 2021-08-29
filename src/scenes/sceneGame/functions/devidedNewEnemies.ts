import {Enemy} from "../../../components/Enemy/Enemy";
import {EnemiesType} from "../../../common/types/EnemiesType";
import {EnemyConsts} from "../../../common/consts/EnemyConsts";
import {PositionDataType} from "../../../common/types/PositionDataType";

/**
 * 敵を分裂処理を行い、その敵の新しい配列を返す関数です
 * @param level
 * @param position
 */
const devideEnemy = (level: number, position: PositionDataType["default"]) => {
  const isBigEnemy = position.r == Math.ceil(EnemyConsts.SIZE / 2);
  const iSmallEnemy = position.r == Math.ceil(EnemyConsts.SIZE / 4);
  let enemies = [];

  if(isBigEnemy) {
    console.log("isBigEnemy")
    const initPosition = {
      x: position.x,
      y: position.y,
      size: Math.ceil(EnemyConsts.SIZE / 4),
    }
    enemies.push(new Enemy(level, false, initPosition));
    enemies.push(new Enemy(level, false, initPosition));

  } else if(iSmallEnemy) {
    console.log("small")
    const initPosition = {
      x: position.x,
      y: position.y,
      size: Math.ceil(EnemyConsts.SIZE / 8),
    }
    enemies.push(new Enemy(level, false, initPosition));
    enemies.push(new Enemy(level, false, initPosition));
  }

  return enemies;
}


/**
 * 分裂処理を済ませた新しい敵配列を返す関数です
 * @param level
 * @param enemies
 * @param index
 */
export const devidedNewEnemies = (level: number, enemies: EnemiesType, index: number) => {
  // 対象のEnemyを分裂させる
  const devidedEnemy = devideEnemy(level, enemies[index].position.getData);
  // 現在のEnemies配列から、対象のEnemyを削除
  const currentEnemies = [...enemies];
  currentEnemies.splice(index, 1);
  // 対象を削除したEnemiesと分裂したEnemyを結合
  const newEmemies = currentEnemies.concat(devidedEnemy);

  return newEmemies;
}