# Mailer

## Usage

POST -> /email

```
"message": {
		"to": "<TO_EMAIL>",
		"subject": "My Subject",
		"body": "My body"
	},
	"options": {
		"template": "sampleTemplate",
		"params": {
			"username": "martin",
			"code": 12345
		}
	}
```
