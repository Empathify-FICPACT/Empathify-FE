"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/utils/api";

interface UserProfileResponse {
  meta: {
    success: boolean;
    message: string;
  };
  data: {
    id: string;
    name: string;
    gender: "male" | "female";
    avatar_id: number;
    total_xp: number;
    current_streak: number;
    longest_streak: number;
  };
}

interface UserProfile {
  id: string;
  name: string;
  gender: "male" | "female";
  avatar_id: number;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
}

const AVATARS = [
  { id: 1, src: "/avatar/avatar1.svg", bg: "bg-[#cbf3f0]" },
  { id: 2, src: "/avatar/avatar2.svg", bg: "bg-[#ffe066]" },
  { id: 3, src: "/avatar/avatar3.svg", bg: "bg-[#aadbed]" },
  { id: 4, src: "/avatar/avatar4.svg", bg: "bg-[#7ae5b4]" },
];

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formName, setFormName] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState(1);
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    "male",
  );

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      setErrorMessage(null);

      try {
        const response = await apiFetch("/api/v1/user/profile", {
          method: "GET",
        });

        const json = (await response.json()) as UserProfileResponse;

        if (!response.ok || !json.meta?.success) {
          throw new Error(json.meta?.message || "Gagal mengambil profil");
        }

        if (!isMounted) return;

        setProfile(json.data);
        setFormName(json.data.name);
        setSelectedGender(json.data.gender);
        setSelectedAvatarId(json.data.avatar_id);
      } catch (error) {
        if (!isMounted) return;
        setProfile(null);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat memuat profil",
        );
      } finally {
        if (isMounted) setIsLoadingProfile(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedAvatar = useMemo(
    () =>
      AVATARS.find((avatar) => avatar.id === selectedAvatarId) ?? AVATARS[0],
    [selectedAvatarId],
  );

  const handleOpenEdit = () => {
    if (!profile) return;
    setFormName(profile.name);
    setSelectedGender(profile.gender);
    setSelectedAvatarId(profile.avatar_id);
    setIsEditing(true);
  };

  const handleConfirmSave = async () => {
    if (!profile || isSaving) return;

    const trimmedName = formName.trim();
    if (!trimmedName) {
      setErrorMessage("Nama tidak boleh kosong.");
      setShowSaveModal(false);
      return;
    }

    const payload: Partial<{
      name: string;
      gender: "male" | "female";
      avatar_id: number;
    }> = {};

    if (trimmedName !== profile.name) payload.name = trimmedName;
    if (selectedGender !== profile.gender) payload.gender = selectedGender;
    if (selectedAvatarId !== profile.avatar_id)
      payload.avatar_id = selectedAvatarId;

    if (Object.keys(payload).length === 0) {
      setShowSaveModal(false);
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const response = await apiFetch("/api/v1/user/profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      const json = (await response.json()) as UserProfileResponse;

      if (!response.ok || !json.meta?.success) {
        throw new Error(json.meta?.message || "Gagal memperbarui profil");
      }

      setProfile(json.data);
      setFormName(json.data.name);
      setSelectedGender(json.data.gender);
      setSelectedAvatarId(json.data.avatar_id);
      window.dispatchEvent(new Event("profile-updated"));
      setShowSaveModal(false);
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan profil",
      );
      setShowSaveModal(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="w-full max-w-435 mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
          Memuat profil...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-435 mx-auto px-4 sm:px-4 lg:px-6 py-6 lg:py-10 bg-[#f9fafb] min-h-screen">
      <div className="flex justify-between items-center mb-6 lg:mb-8 mt-2">
        <h1 className="text-2xl md:text-[28px] font-bold text-gray-900">
          {isEditing ? "Profile Anda" : "Profil Anda"}
        </h1>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {!isEditing && profile ? (
        <>
          {/* View Mode */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 lg:p-8 flex flex-col md:flex-row items-center md:items-center justify-between mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
              <div
                className={`w-25 h-25 rounded-2xl overflow-hidden ${selectedAvatar.bg} shrink-0 items-center`}
              >
                <Image
                  src={selectedAvatar.src}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
                <h3 className="text-[#2cb46c] text-xl lg:text-2xl font-bold leading-none mb-2 mt-2">
                  {profile.name}
                </h3>
                <p className="text-sm lg:text-xl font-semibold text-gray-900 leading-none mb-3">
                  {profile.gender === "male" ? "Laki-laki" : "Perempuan"}
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenEdit}
              className="mt-6 md:mt-0 w-full sm:w-auto px-8 py-2.5 bg-[#2cb46c] text-white text-lg font-bold rounded-xl hover:bg-[#259b5c] transition-colors"
            >
              Ubah
            </button>
          </div>

          <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-6 mt-4">
            Statistik
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-[20px] p-6 flex flex-1 items-center gap-4 shadow-sm">
              <div className="w-17.5 h-17.5 shrink-0">
                <Image
                  src="/icon/PenghargaanSimbol.svg"
                  alt="Coin"
                  width={70}
                  height={70}
                />
              </div>
              <div className="ml-2">
                <p className="text-lg lg:text-xl font-medium text-gray-400 mb-0.5">
                  Total Pingo Coin
                </p>
                <p className="text-xl lg:text-2xl font-extrabold text-gray-900 leading-snug">
                  {profile.total_xp} XP
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-[20px] p-6 flex flex-1 items-center gap-4 shadow-sm">
              <div className="w-17.5 h-17.5 shrink-0">
                <Image
                  src="/logo/BadgeLevel.svg"
                  alt="Lencana"
                  width={70}
                  height={70}
                />
              </div>
              <div className="ml-2">
                <p className="text-lg lg:text-xl font-medium text-gray-400 mb-0.5">
                  Streak Terpanjang
                </p>
                <p className="text-xl lg:text-2xl font-extrabold text-gray-900 leading-snug">
                  {profile.longest_streak} Hari
                </p>
              </div>
            </div>
          </div>
        </>
      ) : profile ? (
        <>
          {/* Edit Mode */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-4 sm:p-6 lg:p-8 shadow-sm">
            <h3 className="text-base sm:text-lg font-medium text-gray-400 mb-3 sm:mb-4">
              Foto Profile
            </h3>
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
              {AVATARS.map((av, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedAvatarId(av.id)}
                  className={`w-20 h-20 sm:w-25 sm:h-25 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 cursor-pointer ${
                    av.bg
                  } border-[3px] ${
                    selectedAvatarId === av.id
                      ? "border-[#2cb46c]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={av.src}
                    alt={`Avatar ${idx + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <h3 className="text-base sm:text-lg font-medium text-gray-400 mb-3 sm:mb-4">
              Informasi Akun
            </h3>

            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Nama Input */}
              <div>
                <label className="block text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full h-11 sm:h-12 px-3 sm:px-4 rounded-xl border border-gray-200 text-lg sm:text-xl outline-none focus:border-[#2cb46c] text-gray-900 font-medium"
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Jenis Kelamin
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setSelectedGender("male")}
                    className={`flex-1 h-10 sm:h-12 rounded-xl border flex items-center justify-center sm:justify-start px-3 sm:px-4 gap-2 sm:gap-3 text-gray-900 font-medium text-lg sm:text-xl transition-colors ${
                      selectedGender === "male"
                        ? "border-[#2cb46c] bg-[#e6fbf2]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <Image
                      src="/icon/SimbolCowo.svg"
                      alt="Laki-laki"
                      width={18}
                      height={18}
                    />
                    Laki-laki
                  </button>
                  <button
                    onClick={() => setSelectedGender("female")}
                    className={`flex-1 h-10 sm:h-12 rounded-xl border flex items-center justify-center sm:justify-start px-3 sm:px-4 gap-2 sm:gap-3 text-gray-900 font-medium text-lg sm:text-xl transition-colors ${
                      selectedGender === "female"
                        ? "border-[#2cb46c] bg-[#e6fbf2]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <Image
                      src="/icon/SimbolCewe.svg"
                      alt="Perempuan"
                      width={22}
                      height={22}
                    />
                    Perempuan
                  </button>
                </div>
              </div>

              {/* Email Input */}
              {/* <div>
                <label className="block text-xl font-bold text-gray-900 mb-2">
                  ID Pengguna
                </label>
                <input
                  type="text"
                  value={profile.id}
                  disabled
                  readOnly
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 text-xl outline-none focus:border-[#2cb46c] text-gray-900 font-medium disabled:bg-gray-50"
                />
              </div> */}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-8">
                <button
                  onClick={() => setShowSaveModal(true)}
                  disabled={isSaving}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#2cb46c] text-white font-bold text-lg sm:text-xl rounded-xl hover:bg-[#259b5c] transition-colors"
                >
                  Simpan Perubahan
                </button>
                {/* <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-8 py-3  text-[#FF0000] font-bold text-xl rounded-xl hover:bg-red-100 border border-gray-300 transition-colors"
                >
                  Hapus Akun
                </button> */}
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormName(profile.name);
                    setSelectedAvatarId(profile.avatar_id);
                    setSelectedGender(profile.gender);
                  }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#E9F8F0] text-[#2cb46c] font-bold text-lg sm:text-xl border border-gray-300 rounded-xl hover:text-green-700"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
          Data profil tidak tersedia.
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl w-full max-w-100 p-6 lg:p-8 flex flex-col items-center text-center shadow-lg">
            <div className="w-30 h-30 mb-4 flex items-center justify-center">
              <Image
                src="/pinguin/PinguinSenang.svg"
                alt="Pingo"
                width={200}
                height={200}
                className="object-contain "
              />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-2">
              Simpan perubahan sekarang?
            </h3>
            <p className="text-[14px] font-medium text-gray-500 mb-8 px-4">
              Perubahan yang kamu lakukan akan disimpan.
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3.5 bg-[#e6fbf2] text-[#2cb46c] font-bold rounded-xl hover:bg-[#d1f7e4] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmSave}
                disabled={isSaving}
                className="flex-1 py-3.5 bg-[#2cb46c] text-white font-bold rounded-xl hover:bg-[#259b5c] transition-colors"
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl w-full max-w-100 p-6 lg:p-8 flex flex-col items-center text-center shadow-lg">
            <div className="w-30 h-30 mb-4 flex items-center justify-center">
              <Image
                src="/pinguin/PinguinSedih.svg"
                alt="Pingo Crying"
                width={200}
                height={200}
                className="object-contain "
              />
            </div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-2">
              Yakin ingin menghapus akun?
            </h3>
            <p className="text-[14px] font-medium text-gray-500 mb-8 px-2 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan dan semua data akan terhapus.
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3.5 bg-[#f9fafb] text-[#ff0000] border border-gray-100 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setIsEditing(false);
                }}
                className="flex-1 py-3.5 bg-[#ff0000] text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
