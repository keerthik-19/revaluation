import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/ContractorProgressUpdate.css';

interface ProgressUpdateProps {
  projectTitle: string;
  currentProgress: number;
  totalBudget: number;
  onSubmit: (data: {
    newProgress: number;
    description: string;
    photos: File[];
    notes: string;
  }) => Promise<void>;
  onCancel: () => void;
}

const ContractorProgressUpdate: React.FC<ProgressUpdateProps> = ({
  projectTitle,
  currentProgress,
  totalBudget,
  onSubmit,
  onCancel
}) => {
  const [newProgress, setNewProgress] = useState(currentProgress);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const progressIncrement = newProgress - currentProgress;
  const amountForMilestone = (totalBudget * progressIncrement) / 100;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newProgress <= currentProgress) {
      setError('Progress must be greater than current progress');
      return;
    }

    if (newProgress > 100) {
      setError('Progress cannot exceed 100%');
      return;
    }

    if (!description.trim()) {
      setError('Please describe the completed work');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        newProgress,
        description,
        photos,
        notes
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit progress update');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMilestone = (newProgress % 10 === 0) && (newProgress !== currentProgress);

  return (
    <div className="progress-update-container">
      <div className="progress-update-header">
        <h2>Update Project Progress</h2>
        <p className="project-name">{projectTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="progress-update-form">
        {/* Current Progress Display */}
        <div className="progress-display">
          <div className="progress-current">
            <span className="label">Current Progress</span>
            <span className="percentage">{currentProgress}%</span>
          </div>
          <div className="progress-arrow">→</div>
          <div className="progress-new">
            <span className="label">New Progress</span>
            <span className="percentage">{newProgress}%</span>
          </div>
        </div>

        {/* Progress Slider */}
        <div className="progress-slider-section">
          <label htmlFor="progress-slider">Mark Progress (10% increments)</label>
          <input
            id="progress-slider"
            type="range"
            min={currentProgress}
            max="100"
            step="10"
            value={newProgress}
            onChange={(e) => setNewProgress(Number(e.target.value))}
            className="progress-slider"
          />
          <div className="slider-labels">
            <span>{currentProgress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Milestone Alert */}
        {isMilestone && (
          <div className="milestone-alert">
            <CheckCircle size={20} />
            <div className="alert-content">
              <p className="alert-title">Milestone Reached!</p>
              <p className="alert-message">
                Homeowner will be invoiced ${amountForMilestone.toFixed(2)} for this {progressIncrement}% completion
              </p>
            </div>
          </div>
        )}

        {/* Work Description */}
        <div className="form-group">
          <label htmlFor="description">Work Completed *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what work was completed in this update"
            rows={4}
            required
            disabled={isSubmitting}
          />
          <p className="char-count">{description.length}/500</p>
        </div>

        {/* Additional Notes */}
        <div className="form-group">
          <label htmlFor="notes">Additional Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional information for the homeowner"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {/* Photo Upload */}
        <div className="form-group">
          <label>Upload Progress Photos</label>
          <div className="photo-upload">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={isSubmitting}
              className="photo-input"
            />
            <div className="upload-placeholder">
              <Upload size={32} />
              <p>Click to upload photos or drag and drop</p>
              <p className="upload-hint">PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>
          {photos.length > 0 && (
            <div className="photos-preview">
              <p className="preview-label">{photos.length} photo(s) selected</p>
              <div className="preview-list">
                {photos.map((photo, index) => (
                  <div key={index} className="preview-item">
                    <span>{photo.name}</span>
                    <span className="size">({(photo.size / 1024 / 1024).toFixed(2)}MB)</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Payment Info */}
        <div className="payment-info">
          <div className="info-box">
            <span className="info-label">Invoice Amount:</span>
            <span className="info-value">${amountForMilestone.toFixed(2)}</span>
          </div>
          <div className="info-box">
            <span className="info-label">Work Completion:</span>
            <span className="info-value">{progressIncrement}%</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn-cancel"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting || newProgress <= currentProgress}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Progress Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractorProgressUpdate;
