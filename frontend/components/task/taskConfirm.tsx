"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProgram } from "./hooks/useProgram";
import { useTransactionToast } from "./hooks/useTransactionToast";
import { SystemProgram, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
/**
 * IncrementButton component that handles its own transaction logic
 * for incrementing the counter.
 */
export function TaskConfirm() {
  // Get program and wallet information from the hook
  const { program, publicKey, connected } = useProgram();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState<
    string | null
  >(null);

  // Use transaction toast hook
  useTransactionToast({ transactionSignature });

  // Handle increment button click
  const confirmTask = async () => {
    if (!publicKey) return;
    // 生成 PDA
    const [taskPDA] = await PublicKey.findProgramAddress(
      [Buffer.from("task"), new BN(70).toArrayLike(Buffer, "le", 8)],
      SystemProgram.programId
    );
    const [configPDA] = await PublicKey.findProgramAddress(
      [Buffer.from("config")],
      SystemProgram.programId
    );

    try {
      setIsLoading(true);
      const task_id = 70;
      // Send the transaction
      const txSignature = await program.methods
        .confirmTask({ task_id })
        .accounts({
          payer: publicKey,
          task: taskPDA, // 自动匹配账户名和类型
          config: configPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      setTransactionSignature(txSignature);
    } catch (err) {
      console.error("Error task confirm:", err);
      toast.error("task confirm", {
        description: `${err}`,
        style: {
          border: "1px solid rgba(239, 68, 68, 0.3)",
          background:
            "linear-gradient(to right, rgba(40, 27, 27, 0.95), rgba(28, 23, 23, 0.95))",
        },
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={confirmTask}
      disabled={isLoading || !connected}
      className="w-[85%] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-11 text-base font-medium"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 rounded-full border-2 border-purple-200/50 border-t-purple-200 animate-spin mr-2"></div>
          <span>Processing...</span>
        </div>
      ) : (
        "confirm Task"
      )}
    </Button>
  );
}
