import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false); //открытие закрытие по стрелочке
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setArticleState({ ...articleState, [key]: value });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(articleState); // Вызываем onApply
		setIsOpen(false); // Закрыть форму после отправки
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					{/* заголовок */}
					<Text weight={800} uppercase as={'h3'} size={31}>
						Задайте параметры
					</Text>

					{/*шрифт*/}
					<Select
						title='Шрифт'
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => {
							handleChange('fontFamilyOption', option);
						}}
					/>

					{/* размер шрифта */}
					<RadioGroup
						name='размер шрифта'
						title='Размер шрифта'
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => {
							handleChange('fontSizeOption', option);
						}}
					/>

					{/* цвет шрифта */}
					<Select
						title='Цвет шрифта'
						selected={articleState.fontColor}
						options={fontColors}
						onChange={(option) => {
							handleChange('fontColor', option);
						}}
					/>

					<Separator />

					{/* цвет фона */}
					<Select
						title='Цвет фона'
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => {
							handleChange('backgroundColor', option);
						}}
					/>

					{/* ширина контента */}
					<Select
						title='Ширина контента'
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => {
							handleChange('contentWidth', option);
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
