import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@kokimoki/react-components/utils';
import { Loader2, RotateCcw, Upload } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export interface ImageUploadControlProps {
	/** Unique id for the file input */
	id: string;
	/** Label shown above the control */
	label: string;
	/** Recommended file format and resolution shown below the label */
	recommendedHint?: string;
	/** Current custom URL, or null/undefined when using the default */
	value?: string | null;
	/** The value the store holds when using the default asset.
	 *  When provided, a value equal to this is treated as "not custom". */
	defaultUrl?: string | null;
	/** Image shown in the preview when no custom value is set */
	fallbackSrc: string;
	/** HTML accept attribute, e.g. "image/png,image/svg+xml" */
	accept: string;
	/** Max upload size in bytes */
	maxSizeBytes?: number;
	/** Called with the selected file. Resolves on success, throws on error. */
	onUpload: (file: File) => Promise<void>;
	/** Called when the user resets to the default */
	onReset: () => Promise<void>;
	disabled?: boolean;
	/** Tailwind classes controlling the preview box size/ratio */
	previewClassName?: string;
}

export function ImageUploadControl({
	id,
	label,
	recommendedHint,
	value,
	defaultUrl,
	fallbackSrc,
	accept,
	maxSizeBytes = 2 * 1024 * 1024,
	onUpload,
	onReset,
	disabled = false,
	previewClassName
}: ImageUploadControlProps) {
	const { t } = useTranslation();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const objectUrlRef = React.useRef<string | null>(null);
	const [uploading, setUploading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);

	React.useEffect(() => {
		return () => {
			if (objectUrlRef.current) {
				URL.revokeObjectURL(objectUrlRef.current);
			}
		};
	}, []);

	const setObjectPreview = (url: string | null) => {
		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
		}
		objectUrlRef.current = url;
		setPreviewSrc(url);
	};

	const isCustom =
		Boolean(value) && (defaultUrl === undefined || value !== defaultUrl);

	const handleFile = React.useCallback(
		async (file: File) => {
			setError(null);

			if (!file.type.startsWith('image/')) {
				setError(t('common:uploadErrorType'));
				return;
			}

			if (file.size > maxSizeBytes) {
				setError(t('common:uploadErrorSize'));
				return;
			}

			setUploading(true);
			setObjectPreview(URL.createObjectURL(file));
			try {
				await onUpload(file);
			} catch {
				setError(t('common:uploadErrorGeneric'));
				setObjectPreview(null);
			} finally {
				setUploading(false);
				if (inputRef.current) {
					inputRef.current.value = '';
				}
			}
		},
		[maxSizeBytes, onUpload, t]
	);

	const handleReset = React.useCallback(async () => {
		setError(null);
		setUploading(true);
		try {
			await onReset();
			setObjectPreview(null);
		} catch {
			setError(t('common:uploadErrorGeneric'));
		} finally {
			setUploading(false);
		}
	}, [onReset, t]);

	const displaySrc = previewSrc ?? (isCustom && value ? value : fallbackSrc);
	const showFallbackBadge = !isCustom && !previewSrc;
	const busy = disabled || uploading;

	return (
		<div>
			<div className="flex flex-col gap-0.5">
				<Label htmlFor={id}>{label}</Label>
				{recommendedHint && (
					<p className="mb-2 text-xs text-slate-500">{recommendedHint}</p>
				)}
			</div>

			<div
				className={cn(
					'flex max-w-96 flex-col gap-3 rounded-xl border border-slate-300 bg-slate-50 p-3',
					{ 'opacity-60': busy }
				)}
			>
				<div
					className={cn(
						'relative flex items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white',
						previewClassName ?? 'h-24 w-full'
					)}
				>
					<img
						src={displaySrc}
						alt={label}
						className="h-full w-full object-contain"
					/>
					{showFallbackBadge && (
						<span className="pointer-events-none absolute right-1 bottom-1 rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
							{t('host:mediaDefaultBadge')}
						</span>
					)}
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<input
						ref={inputRef}
						id={id}
						type="file"
						accept={accept}
						className="sr-only"
						disabled={busy}
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								void handleFile(file);
							}
						}}
					/>
					<Button
						variant="secondary"
						type="button"
						disabled={busy}
						onClick={() => inputRef.current?.click()}
						className="px-3 py-2 text-sm"
					>
						{uploading ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<Upload className="size-4" />
						)}
						{uploading ? t('common:uploading') : t('common:uploadButton')}
					</Button>

					{isCustom && (
						<Button
							variant="secondary"
							type="button"
							disabled={busy}
							onClick={handleReset}
							className="px-3 py-2 text-sm"
						>
							<RotateCcw className="size-4" />
							{t('common:resetButton')}
						</Button>
					)}
				</div>

				{error && <p className="text-xs font-medium text-red-500">{error}</p>}
			</div>
		</div>
	);
}
