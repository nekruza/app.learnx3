import { create } from "zustand"
import { persist } from "zustand/middleware"

const useStoreTemporary = create((set) => ({
	loadingGenContentAI: false,
	setLoadingGenContentAI: (x) =>
		set({
			loadingGenContentAI: x,
		}),
	class_id: null,
	setClassId: (class_id) =>
		set({
			class_id: class_id,
		}),
	sidebarWidth: 300,
	setSidebarWidth: (width) =>
		set({
			sidebarWidth: width,
		}),
	botComponentWidth: 0,
	setBotComponentWidth: (width) =>
		set({
			botComponentWidth: width,
		}),
}))

const useClassInfo = create((set, get) => ({
	classInfo: null,
	setClassInfo: (class_) =>
		set({
			classInfo: class_,
		}),
}))

const useStore = create(
	persist(
		(set) => ({
			lessonState: {},
			setLessonState: (lesson_gpt) =>
				set((state) => ({
					lessonState: lesson_gpt,
				})),
			removeSessions: () =>
				set({
					lessonState: {},
				}),
		}),
		{
			name: "english-lesson", // unique name
			getStorage: () => sessionStorage,
		}
	)
)

const useStoreUser = create(
	persist(
		(set, get) => ({
			userInfo: null,
			setUserInfo: (user) =>
				set({
					userInfo: user,
				}),
			userLogin: {},
			setUserLogin: (user) =>
				set({
					userLogin: user,
				}),
		}),
		{
			name: "current-user", // unique name
			getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
		}
	)
)


export const useStoreFilePath = create(
	(set, get) => ({
		aiFilePath: '',
		setAiFilePath: (text) => set(() => ({ aiFilePath: text })),
	}),
 
)


export const useChatStore = create((set) => ({
		messages: [{
			role: "system",
			content:
				"You an assistant which helps users with improving their english speaking fluency. Talk short sentences. If the user does mistakes, you will correct them."
		}, {
			role: "assistant",
			content: "Hey! I'm Fina. Let's practice your English! What would you like to talk about?"
		}],
		addMessage: (message) => set((state) => ({ messages: message }))
}))

export const useSuggestionsStore = create((set) => ({
suggestion: 'Hey, how are you?',
addSuggestion: (message) => set((state) => ({ suggestion: message }))
}))


const usePresentationStore = create((set) => ({
	presentation: null,
	setPresentation: (presentation) => set(() => ({ presentation: presentation })),
}))


export { useStore, useStoreTemporary, useStoreUser, useClassInfo, usePresentationStore }
