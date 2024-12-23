'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';
import { useState } from "react";

const Cards: any = [
  {
    id: 1,
    isFlip: false,
    adj1: '1',
    adj2: '2',
  },
  {
    id: 2,
    isFlip: false,
    adj1: '3',
    adj2: '4',
  },
  {
    id: 3,
    isFlip: false,
    adj1: '5',
    adj2: '6',
  },
  {
    id: 4,
    isFlip: false,
    adj1: '7',
    adj2: '8',
  },
  {
    id: 5,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 6,
    isFlip: false,
    adj1: '1',
    adj2: '2',
  },
  {
    id: 7,
    isFlip: false,
    adj1: '3',
    adj2: '4',
  },
  {
    id: 8,
    isFlip: false,
    adj1: '5',
    adj2: '6',
  },
  {
    id: 9,
    isFlip: false,
    adj1: '7',
    adj2: '8',
  },
  {
    id: 10,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 11,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 12,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 13,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 14,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 15,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 16,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 17,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 18,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 19,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 20,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 21,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
  {
    id: 22,
    isFlip: false,
    adj1: '9',
    adj2: '10',
  },
];

export default function Home() {
  const [cards, setCards] = useState<any>(Cards);

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
      <div className="w-[1000px]">
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
                        className="flex justify-center border rounded-md"
                      >
                        <div
                          className="flex w-full h-[100px] justify-center border-2 shadow-sm"
                        >
                          {card.isFlip ? (
                            <motion.div
                              className="w-full flex-1 rounded-lg"
                              initial={{ rotateY: 180 }}
                            >
                              <div className="flex flex-col h-full w-full items-center justify-center rounded-lg bg-stone-50 text-3xl font-semibold">
                                <div>{card.adj1}</div>
                                <div>{card.adj2}</div>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="flex w-1/2 p-3 items-center rounded-lg">
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
      </div>
    </div>
  );
}
