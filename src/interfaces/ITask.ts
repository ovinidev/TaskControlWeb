export interface ITask {
	id: string;
	name: string;
	description: string;
	hours: number;
	date: Date;
	createdAt: string;
	updatedAt: string;
	userId: string;
}

export interface ICreateTask {
	name: string;
	description: string;
	hours: number;
	date: Date;
}

export interface IUpdateTask {
	date?: Date;
	description?: string;
	hours?: number;
	name?: string;
}
