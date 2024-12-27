'use client';

import { shuffleArray } from "@/utils";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Cards: any = [
  {
    id: 1,
    isFlip: false,
    adj1: '熱熱的',
    adj2: '男女都可以用的',
  },
  {
    id: 2,
    isFlip: false,
    adj1: '燃燒系',
    adj2: '熱血加倍',
  },
  {
    id: 3,
    isFlip: false,
    adj1: '香香的',
    adj2: '滑滑的',
  },
  {
    id: 4,
    isFlip: false,
    adj1: '煞氣a、心驚膽跳的',
    adj2: '神采飛揚的',
  },
  {
    id: 5,
    isFlip: false,
    adj1: '帶給你能量',
    adj2: '好循環',
  },
  {
    id: 6,
    isFlip: false,
    adj1: '讓人感到放鬆的，運動前後都可以使用的',
    adj2: '大家都會想體驗的',
  },
  {
    id: 7,
    isFlip: false,
    adj1: '小小的',
    adj2: '方便的',
  },
  {
    id: 8,
    isFlip: false,
    adj1: '有氣氛的、細緻水嫩的',
    adj2: '助眠的',
  },
  {
    id: 9,
    isFlip: false,
    adj1: '爆汗的',
    adj2: '苗條的',
  },
  {
    id: 10,
    isFlip: false,
    adj1: '芬芳的',
    adj2: '滑順的',
  },
  {
    id: 11,
    isFlip: false,
    adj1: '久了會有味道的',
    adj2: '有重量的',
  },
  {
    id: 12,
    isFlip: false,
    adj1: '紅色的、運動完可以用的',
    adj2: '很欠揍的',
  },
  {
    id: 13,
    isFlip: false,
    adj1: '多人運動的',
    adj2: '當心兒童的',
  },
  {
    id: 14,
    isFlip: false,
    adj1: 'ㄉㄨㄞ ㄉㄨㄞ ㄉㄨㄞ的',
    adj2: '好爽的',
  },
  {
    id: 15,
    isFlip: false,
    adj1: '充滿正面能量的、萌的',
    adj2: '男女都適用的',
  },
  {
    id: 16,
    isFlip: false,
    adj1: '需要用到嘴巴的',
    adj2: '每天都需要用到的',
  },
  {
    id: 17,
    isFlip: false,
    adj1: '圓圓的、脊椎發涼的',
    adj2: '給交得到女朋友用的',
  },
  {
    id: 18,
    isFlip: false,
    adj1: '二合一的',
    adj2: '有聲音的、會動的',
  },
  {
    id: 19,
    isFlip: false,
    adj1: '好玩的',
    adj2: '手指運動的',
  },
  {
    id: 20,
    isFlip: false,
    adj1: '百搭又實用的',
    adj2: '',
  },
  {
    id: 21,
    isFlip: false,
    adj1: '會讓你軟軟QQ的東西',
    adj2: '',
  },
  {
    id: 22,
    isFlip: false,
    adj1: '下半身用的',
    adj2: 'Marvels 蜘蛛人聯名款、很實用',
  },
];

export default function Home() {
  const [cards, setCards] = useState<any>([]);

  useEffect(() => {
    const shuffled = shuffleArray(Cards);
    setCards(shuffled);
  }, []);

  const onFlip = (id: number) => {
    const newCards = cards.map((card: any) => {
      if (card.id === id) {
        card.isFlip = !card.isFlip;
      }
      return card;
    })
    setCards(newCards);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%]">
        <div className="grid grid-cols-5 gap-4">
          <AnimatePresence>
            {cards.map((card: any) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    transition={{ duration: 0.3 }}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: card.isFlip ? 180 : 0 }}
                    onAnimationComplete={() => {}}
                    onClick={() => {
                      onFlip(card.id);
                    }}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      transition={{
                        ease: 'linear',
                        duration: 0.4,
                      }}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{
                          scale: card.isFlip ? 1 : 1.05,
                        }}
                        whileTap={{ scale: 1 }}
                        className="flex justify-center border rounded-md cursor-pointer"
                      >
                        <div
                          className="flex w-full h-[100px] justify-center border-2 shadow-sm"
                        >
                          {card.isFlip ? (
                            <motion.div
                              className="w-full flex-1 rounded-lg"
                              initial={{ rotateY: 180 }}
                            >
                              <div className="flex h-full w-full items-center justify-center rounded-sm bg-slate-500 text-white text-3xl font-semibold">
                                <div>{card.id}</div>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="p-2 flex flex-col h-full w-full items-center justify-center font-semibold">
                              <div className={card.adj1.length >= 9 ? 'text-base text-center' : 'text-xl text-center'}>{card.adj1}</div>
                              {card.adj2 && <div className={card.adj2.length >= 9 ? 'text-base text-center' : 'text-xl text-center'}>{card.adj2}</div>}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
