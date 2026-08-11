"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function TeacherCopilotPage() {
  const [activeTab, setActiveTab] = useState<"copilot" | "assistant" | "planner">("copilot");
  const [prompt, setPrompt] = useState("");
  const [knowledgeBaseText, setKnowledgeBaseText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [plannerMode, setPlannerMode] = useState<"Harian" | "Mingguan" | "Bulanan" | "Kalender">("Harian");
  const [assistantMode, setAssistantMode] = useState<"Strategi Mengajar" | "Ice Breaking" | "Aktivitas Kelas" | "Differentiated Learning" | "Project Based Learning">("Strategi Mengajar");
  
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Halo Bapak/Ibu Guru! Saya **Teacher Copilot AI (by Aldirb354)**. Silakan upload dokumen materi (PDF/DOCX/PPTX) atau langsung tanyakan strategi mengajar, ice breaking, serta pembuatan rencana pembelajaran harian/mingguan!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // File Upload Simulator
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setKnowledgeBaseText(
        (prev) =>
          prev +
          `\n[Dokumen Ter-upload: ${newFiles.join(", ")}]\nIsi Bab 4: Konsep Dasar Pengukuran, Halaman 35: Latihan Kerja Mandiri & Asesmen Formatif.`
      );
    }
  };

  const handleSendPrompt = async (actionType: "chat" | "lesson_plan" | "pedagogy_assistant" = "chat", customPrompt?: string) => {
    const inputPrompt = customPrompt || prompt;
    if (!inputPrompt.trim()) return;

    const newMessages = [...messages, { role: "user" as const, content: inputPrompt }];
    setMessages(newMessages);
    if (!customPrompt) setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: actionType,
          prompt: inputPrompt,
          documentContext: knowledgeBaseText,
          mode: actionType === "lesson_plan" ? plannerMode : assistantMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Maaf, terjadi masalah saat menghubungkan ke Copilot AI." }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Gagal memproses permintaan." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">
            ← Dashboard
          </Link>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-white">Teacher Copilot AI</span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 -mt-1">
              by Aldirb354
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("copilot")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "copilot" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🧠 Knowledge Base Chat
          </button>
          <button
            onClick={() => setActiveTab("assistant")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "assistant" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🎯 Teacher Assistant
          </button>
          <button
            onClick={() => setActiveTab("planner")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "planner" ? "bg-pink-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📅 AI Lesson Planner
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 max-w-7xl w-full mx-auto p-6 gap-6">
        {/* Left Sidebar: Knowledge Base & Upload Document */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-bold text-sm text-indigo-400 mb-2 flex items-center gap-2">
              <span>📁 Upload Knowledge Base</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Unggah PDF, DOCX, PPTX, atau Buku Pelajaran agar Copilot memahami materi Anda secara khusus!
            </p>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-4 cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition-all">
              <span className="text-2xl mb-1">📄</span>
              <span className="text-xs font-semibold text-slate-300">Pilih File Buku / Modul</span>
              <span className="text-[10px] text-slate-500 mt-1">PDF, DOCX, PPTX (Max 50MB)</span>
              <input type="file" multiple accept=".pdf,.docx,.pptx" className="hidden" onChange={handleFileUpload} />
            </label>

            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <span className="text-xs font-semibold text-slate-400">Dokumen Aktif:</span>
                <ul className="mt-2 space-y-1">
                  {uploadedFiles.map((file, i) => (
                    <li key={i} className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md truncate flex items-center justify-between">
                      <span className="truncate">✓ {file}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSendPrompt("chat", "Buatkan 5 soal Pilihan Ganda & Uraian dari Bab 4 beserta Kunci Jawaban!")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-800 text-slate-300 transition-all"
              >
                📝 "Buatkan soal dari Bab 4"
              </button>
              <button
                onClick={() => handleSendPrompt("chat", "Buatkan Lembar Kerja Peserta Didik (LKPD) menarik dari materi Halaman 35!")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-800 text-slate-300 transition-all"
              >
                📑 "Buatkan LKPD dari Halaman 35"
              </button>
              <button
                onClick={() => handleSendPrompt("chat", "Buatkan ringkasan materi pembelajaran yang mudah dipahami murid!")}
                className="text-left text-xs bg-slate-950 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-800 text-slate-300 transition-all"
              >
                📌 "Buatkan ringkasan materi"
              </button>
            </div>
          </div>
        </div>

        {/* Right Area: Interactive Workspace & AI Chat */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[750px] overflow-hidden shadow-2xl">
          {/* TAB 1: Knowledge Base Copilot Chat */}
          {activeTab === "copilot" && (
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-3xl rounded-2xl p-4 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-none shadow-lg"
                          : "bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-inner"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs text-indigo-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                      <span>Copilot AI sedang membaca dokumen & menyusun jawaban...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendPrompt("chat")}
                  placeholder="Ketik pertanyaan atau instruksi untuk Copilot AI..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleSendPrompt("chat")}
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
                >
                  Kirim
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Teacher Pedagogy Assistant */}
          {activeTab === "assistant" && (
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">Teacher Pedagogy Assistant</h2>
                <p className="text-xs text-slate-400">Bantuan taktik mengajar, ice breaking kelas, hingga skenario Project Based Learning.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(["Strategi Mengajar", "Ice Breaking", "Aktivitas Kelas", "Differentiated Learning", "Project Based Learning"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setAssistantMode(m)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      assistantMode === m ? "bg-purple-600 border-purple-500 text-white" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-slate-300">Topik Pembelajaran / Kelas:</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Contoh: Kelas 7 SMP, Topik Perubahan Iklim & Ekosistem, murid cenderung pasif..."
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500 h-28"
                />
                <button
                  onClick={() => handleSendPrompt("pedagogy_assistant")}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-lg"
                >
                  {loading ? "Menyusun Rekomendasi..." : `Generate Rekomendasi (${assistantMode})`}
                </button>
              </div>

              {messages.length > 1 && (
                <div className="mt-4 p-5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {messages[messages.length - 1].content}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AI Lesson Planner */}
          {activeTab === "planner" && (
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">AI Lesson Planner Engine</h2>
                <p className="text-xs text-slate-400">Generate Rencana Pembelajaran Harian, Mingguan, Bulanan, hingga Kalender secara instan.</p>
              </div>

              <div className="flex gap-2">
                {(["Harian", "Mingguan", "Bulanan", "Kalender"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPlannerMode(mode)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      plannerMode === mode ? "bg-pink-600 border-pink-500 text-white" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Rencana {mode}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-semibold text-slate-300">Detail Pembelajaran / Target Capaian:</label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Contoh: Matematika Kelas 4 SD - Materi Sifat-Sifat Bangun Datar (Semester 1)"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500"
                />
                <button
                  onClick={() => handleSendPrompt("lesson_plan")}
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-90 py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-lg"
                >
                  {loading ? "Menyusun Rencana Pembelajaran..." : `Generate Rencana ${plannerMode} AI`}
                </button>
              </div>

              {messages.length > 1 && (
                <div className="mt-4 p-5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {messages[messages.length - 1].content}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
