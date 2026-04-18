'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateMyProfile, type ProfileInput } from '@/actions/profile'
import { Save, User as UserIcon } from 'lucide-react'

type Profile = {
  email: string
  username: string
  firstName: string | null
  lastName: string | null
  avatarUrl: string | null
  company: string | null
  jobTitle: string | null
  bio: string | null
  website: string | null
}

export function ProfileForm({ initial }: { initial: Profile }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [form, setForm] = useState<ProfileInput>({
    username: initial.username,
    firstName: initial.firstName ?? '',
    lastName: initial.lastName ?? '',
    avatarUrl: initial.avatarUrl ?? '',
    company: initial.company ?? '',
    jobTitle: initial.jobTitle ?? '',
    bio: initial.bio ?? '',
    website: initial.website ?? '',
  })
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)

  function set<K extends keyof ProfileInput>(k: K, v: ProfileInput[K]) {
    setForm((p) => ({ ...p, [k]: v }))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setFeedback(null)
    startTransition(async () => {
      const res = await updateMyProfile(form)
      if (res?.error) {
        setFeedback({ type: 'err', msg: res.error })
        return
      }
      setFeedback({ type: 'ok', msg: 'Profil mis à jour.' })
      router.refresh()
    })
  }

  const avatarPreview = form.avatarUrl?.trim()

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Avatar + email */}
      <div className="bg-white border border-[#DEE2E6] rounded-xl p-6 flex items-center gap-5">
        {avatarPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarPreview}
            alt=""
            className="w-20 h-20 rounded-full object-cover border border-[#DEE2E6]"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#F1F3F5] flex items-center justify-center text-[#888]">
            <UserIcon size={32} />
          </div>
        )}
        <div className="min-w-0">
          <div className="text-sm text-[#555B6E]">Connecté avec</div>
          <div className="text-base font-semibold text-[#1A1A2E] truncate">{initial.email}</div>
          <div className="text-xs text-[#888] mt-1">
            L&apos;email est défini par votre compte Google et ne peut pas être modifié ici.
          </div>
        </div>
      </div>

      {/* Identité */}
      <fieldset className="bg-white border border-[#DEE2E6] rounded-xl p-6 space-y-4">
        <legend className="px-2 text-sm font-semibold text-[#1A3A5C] uppercase tracking-wider">
          Identité
        </legend>
        <Field label="Pseudo (identifiant public)" required>
          <input
            type="text"
            value={form.username}
            onChange={(e) => set('username', e.target.value.toLowerCase())}
            pattern="[a-z0-9_]+"
            minLength={2}
            maxLength={30}
            required
            className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30"
          />
          <p className="text-xs text-[#888] mt-1">Lettres minuscules, chiffres ou _.</p>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Prénom">
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              maxLength={60}
              className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30"
            />
          </Field>
          <Field label="Nom">
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => set('lastName', e.target.value)}
              maxLength={60}
              className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30"
            />
          </Field>
        </div>
        <Field label="URL de l'avatar">
          <input
            type="url"
            value={form.avatarUrl}
            onChange={(e) => set('avatarUrl', e.target.value)}
            placeholder="https://…"
            className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30"
          />
        </Field>
      </fieldset>

      {/* Activité pro */}
      <fieldset className="bg-white border border-[#DEE2E6] rounded-xl p-6 space-y-4">
        <legend className="px-2 text-sm font-semibold text-[#1A3A5C] uppercase tracking-wider">
          Activité
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Entreprise / Studio">
            <input
              type="text"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              maxLength={120}
              className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30"
            />
          </Field>
          <Field label="Poste / Métier">
            <input
              type="text"
              value={form.jobTitle}
              onChange={(e) => set('jobTitle', e.target.value)}
              maxLength={120}
              className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30"
            />
          </Field>
        </div>
        <Field label="Site web">
          <input
            type="url"
            value={form.website}
            onChange={(e) => set('website', e.target.value)}
            placeholder="https://…"
            className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30"
          />
        </Field>
        <Field label="Bio">
          <textarea
            value={form.bio}
            onChange={(e) => set('bio', e.target.value)}
            maxLength={800}
            rows={4}
            className="w-full px-3 py-2 border border-[#DEE2E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/30 resize-y"
          />
          <p className="text-xs text-[#888] mt-1">{form.bio?.length ?? 0} / 800</p>
        </Field>
      </fieldset>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {feedback ? (
          <div
            className={`text-sm ${
              feedback.type === 'ok' ? 'text-[#2E7D32]' : 'text-[#C62828]'
            }`}
          >
            {feedback.msg}
          </div>
        ) : <span />}
        <button
          type="submit"
          disabled={pending}
          className="bg-[#1A3A5C] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#142f4e] transition-colors disabled:opacity-50 inline-flex items-center gap-2"
        >
          <Save size={16} /> {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#1A1A2E] block mb-1.5">
        {label}
        {required && <span className="text-[#C62828] ml-0.5">*</span>}
      </span>
      {children}
    </label>
  )
}
