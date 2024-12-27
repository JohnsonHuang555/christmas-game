'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { shuffleArray } from "@/utils";
import { AnimatePresence, motion, } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import uuid from 'short-uuid';

const Cards = [
  { isFlip: false, name: '王瑀萱', value: 'a', isMatched: false },
  { isFlip: false, name: '大胃', value: 'a', isMatched: false },
  { isFlip: false, name: '黃有信', value: 'b', isMatched: false },
  { isFlip: false, name: 'Gary', value: 'b', isMatched: false },
  { isFlip: false, name: '林思妤', value: 'c', isMatched: false },
  { isFlip: false, name: 'Jessie', value: 'c', isMatched: false },
  { isFlip: false, name: '邱博晟', value: 'd', isMatched: false },
  { isFlip: false, name: 'Chris', value: 'd', isMatched: false },
  { isFlip: false, name: '楊新義', value: 'e', isMatched: false },
  { isFlip: false, name: 'Ian', value: 'e', isMatched: false },
  { isFlip: false, name: '范瑋庭', value: 'f', isMatched: false },
  { isFlip: false, name: 'Claire', value: 'f', isMatched: false },
  { isFlip: false, name: '陳暐翔', value: 'g', isMatched: false },
  { isFlip: false, name: 'Jamie', value: 'g', isMatched: false },
  { isFlip: false, name: '黃光琦', value: 'h', isMatched: false },
  { isFlip: false, name: 'Amber', value: 'h', isMatched: false },
]

let timerId: any = null;

export default function Home() {
  const [cards, setCards] = useState<any>([]);
  const [isGameStart, setIsGameStart] = useState(false);
  const [remainedTime, setRemainTime] = useState(100);
  const [currentSelectedCards, setCurrentSelectedCards] = useState<any[]>([]);
  const [showNextPage, setShowNextPage] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const gameBoard: any[] = Cards.reduce<any[]>(
      (acc, c) => {
        const id = uuid().new();
        acc.push({
          id,
          content: c.value,
          label: c.name,
          isFlip: false,
          isMatched: false
        });
        return acc;
      },
      [],
    );
    const shuffled = shuffleArray(gameBoard);
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (cards.length) {
      // 全部配對完成
      const isComplete = cards.every((c: any) => c.isMatched);
      if (isComplete) {
        alert(`遊戲結束: 剩餘${remainedTime}`);
        clearInterval(timerId);
        setShowNextPage(true);
      }
    }
  }, [cards, remainedTime]);

  const startTimer = useCallback(() => {
    if (timerId) clearInterval(timerId);
    const id = setInterval(() => {
      setRemainTime(state => state - 1);
    }, 1000);
    timerId = id;
  }, []);

  useEffect(() => {
    if (isGameStart) {
      startTimer();
    }
  }, [isGameStart, startTimer])

  const onFlip = (id: number) => {
    if (!isGameStart) {
      setIsGameStart(true);
    }
    const newCards = cards.map((card: any) => {
      if (card.id === id) {
        card.isFlip = true;
      }
      return card;
    })
    setCards(newCards);
  }

  // 更新狀態
  const updateCardStatus = (cardId: string) => {
    if (currentSelectedCards.length === 0) return;
    const currentIndex = currentSelectedCards.findIndex(
      card => card.id === cardId,
    );
    // 確保找到的索引有效且不是負數
    if (currentIndex === -1) return;

    // 根據規則，找到另一個物件的索引
    const pairIndex =
      currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;

    // 另一張卡
    const otherCard = currentSelectedCards[pairIndex];

    if (currentSelectedCards[currentIndex].isMatched) {
      if (otherCard?.isAnimateComplete) {
        const newCards = cards.map((c: any) => {
          if (c.id === cardId || c.id === otherCard?.id) {
            c.isMatched = true;
          }
          return c;
        });
        setCards(newCards);

        const newCurrentSelectCards = currentSelectedCards.filter(
          c => ![cardId, otherCard?.id].includes(c.id),
        );

        setCurrentSelectedCards(newCurrentSelectCards);
      } else {
        const newCurrentSelectCards = currentSelectedCards.map(c => {
          if (c.id === cardId) {
            c.isAnimateComplete = true;
          }
          return c;
        });
        setCurrentSelectedCards(newCurrentSelectCards);
      }
    } else {
      if (otherCard?.isAnimateComplete) {
        setTimeout(() => {
          setCards((state: any) =>
            state.map((c: any) => {
              if (c.id === cardId || c.id === otherCard?.id) {
                c.isFlip = false;
              }
              return c;
            }),
          );
        }, 500);

        const newCurrentSelectCards = currentSelectedCards.filter(
          c => ![cardId, otherCard?.id].includes(c.id),
        );

        setCurrentSelectedCards(newCurrentSelectCards);
      } else {
        const newCurrentSelectCards = currentSelectedCards.map(c => {
          if (c.id === cardId) {
            c.isAnimateComplete = true;
          }
          return c;
        });
        setCurrentSelectedCards(newCurrentSelectCards);
      }
    }
  };

  // 檢查是否配對成功
  const checkIsMatch = (card: any) => {
    const alreadyExist = currentSelectedCards.find(c => c.id === card.id);
    // 沒選過的才能寫入
    if (alreadyExist) return;

    const temp: any[] = [...currentSelectedCards, { ...card }];
    const newCards = temp.reduce<any[]>((acc, card, index) => {
      if (index % 2 === 1) {
        // 每 2 張卡片一組，並進行配對
        const prevCard = acc[acc.length - 1];
        if (prevCard.content === card.content) {
          prevCard.isMatched = true;
          card.isMatched = true;
        } else {
          prevCard.isMatched = false;
          card.isMatched = false;
        }
      }
      acc.push(card);
      return acc;
    }, []);
    setCurrentSelectedCards(newCards);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[600px] max-md:w-[90%] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 flex-row flex items-center"
        >
          <Image src="/timer.svg" width={28} height={28} alt="timer" />
          <div className="text-2xl ml-1 font-medium">
            {remainedTime}
          </div>
        </motion.div>
        <div className="grid grid-cols-4 gap-4 max-md:gap-3 mb-10">
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
                    onAnimationComplete={() => updateCardStatus(card.id)}
                    onClick={() => {
                      if (card.isFlip) return;
                      onFlip(card.id);
                      checkIsMatch(card);
                    }}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: card.isMatched ? [1, 1.15, 1] : 1 }}
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
                        className="flex justify-center border rounded-md"
                      >
                        <div
                          className="flex w-full aspect-square justify-center border-2 shadow-sm"
                        >
                          {card.isFlip ? (
                            <motion.div
                              className="w-full flex-1 rounded-lg"
                              initial={{ rotateY: 180 }}
                            >
                              <div className="flex text-lg h-full w-full items-center justify-center rounded-lg bg-stone-50">
                                <div>{card.label}</div>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="flex w-1/2 items-center rounded-lg">
                              <Image
                                src="/question.svg"
                                alt="question"
                                width={100}
                                height={100}
                                priority
                              />
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
        {showNextPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => {
                push('/game');
              }}
              className="border py-3 px-5 rounded-md bg-zinc-500 text-white text-lg"
            >
              正式開始囉！
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
