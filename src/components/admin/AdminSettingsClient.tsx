'use client'

import { useState } from 'react'
import { updateSettings } from '@/actions/admin'
import { Check } from 'lucide-react'

export function AdminSettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings)
  const [saved, setSaved] = useState(false)

  function update(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    await updateSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-xl">
      {/* Seuils */}
      <div className="bg-white border border-[#DEE2E6] rounded-xl p-5">
        <h2 className="font-semibold text-[#1A1A2E] mb-4">Seuils de couleur du badge</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: settings.color_green ?? '#2E7D32' }} />
            <span className="text-sm text-[#555B6E] w-40">Vert — score ≥</span>
            <input
              type="number"
              min={0}
              max={100}
              value={settings.score_threshold_green ?? '75'}
              onChange={(e) => update('score_threshold_green', e.target.value)}
              className="w-20 border border-[#DEE2E6] rounded px-2 py-1 text-sm"
            />
            <span className="text-sm text-[#888]">%</span>
            <input
              type="color"
              value={settings.color_green ?? '#2E7D32'}
              onChange={(e) => update('color_green', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: settings.color_blue ?? '#1565C0' }} />
            <span className="text-sm text-[#555B6E] w-40">Bleu — score ≥</span>
            <input
              type="number"
              min={0}
              max={100}
              value={settings.score_threshold_blue ?? '40'}
              onChange={(e) => update('score_threshold_blue', e.target.value)}
              className="w-20 border border-[#DEE2E6] rounded px-2 py-1 text-sm"
            />
            <span className="text-sm text-[#888]">%</span>
            <input
              type="color"
              value={settings.color_blue ?? '#1565C0'}
              onChange={(e) => update('color_blue', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: settings.color_violet ?? '#6A1B9A' }} />
            <span className="text-sm text-[#555B6E] w-40">Violet — score &lt;</span>
            <span className="text-sm text-[#888] w-20 text-center">seuil bleu</span>
            <span className="text-sm text-[#888]" />
            <input
              type="color"
              value={settings.color_violet ?? '#6A1B9A'}
              onChange={(e) => update('color_violet', e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0"
            />
          </div>
        </div>
      </div>

      {/* Textes */}
      <div className="bg-white border border-[#DEE2E6] rounded-xl p-5">
        <h2 className="font-semibold text-[#1A1A2E] mb-4">Textes du label</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Nom du label</label>
            <input
              value={settings.label_title ?? 'Label IGE'}
              onChange={(e) => update('label_title', e.target.value)}
              className="w-full border border-[#DEE2E6] rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Tagline</label>
            <input
              value={settings.label_tagline ?? ''}
              onChange={(e) => update('label_tagline', e.target.value)}
              className="w-full border border-[#DEE2E6] rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-[#1A3A5C] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors flex items-center gap-2"
      >
        {saved ? <><Check size={16} /> Sauvegardé</> : 'Enregistrer les paramètres'}
      </button>
    </div>
  )
}
