import { motion } from 'framer-motion'
import Button from '../atoms/Button'
import AppIcon from '../atoms/AppIcon'
import Text from '../atoms/Text'
import Label from '../atoms/Label'
const MediaAttachmentInput = ({ attachedMedia, onAddMedia, onRemoveMedia, maxMedia }) => {
  return (
    <div>
      <Label className="block text-sm font-medium text-surface-700 mb-2">
        Attached Images
      </Label>
      {attachedMedia.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {attachedMedia.map((media, index) => (
            <motion.div
              key={media.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <img
                src={`https://images.unsplash.com/photo-${1500000000 + index}?w=200&h=150&fit=crop`}
                alt=""
                className="w-full h-24 object-cover rounded-lg"
              />
              <Button
                type="button"
                onClick={() => onRemoveMedia(media.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                icon={AppIcon}
                iconProps={{ name: "X", size: 12, className: 'text-white' }}
              />
            </motion.div>
          ))}
        </div>
      )}
      <Button
        type="button"
        onClick={onAddMedia}
        disabled={attachedMedia.length >= maxMedia}
        className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary-dark hover:bg-primary/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        icon={AppIcon}
        iconProps={{ name: "ImagePlus", size: 16 }}
      >
        <Text type="span" className="text-sm font-medium">Add Photo</Text>
      </Button>
    </div>
  )
}

export default MediaAttachmentInput